// Post domain library — stateless functions operating on injected state
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Int "mo:core/Int";
import CommonTypes "../types/common";
import UserLib "user";
import Runtime "mo:core/Runtime";

module {
  public type UserId = CommonTypes.UserId;
  public type PostId = CommonTypes.PostId;
  public type CommentId = CommonTypes.CommentId;
  public type Timestamp = CommonTypes.Timestamp;
  public type ApiError = CommonTypes.ApiError;
  public type Result<T, E> = CommonTypes.Result<T, E>;

  // Comment (immutable after creation)
  public type Comment = {
    id : CommentId;
    user : UserId;
    text : Text;
    createdAt : Timestamp;
  };

  // Internal post with mutable fields
  public type PostInternal = {
    id : PostId;
    user : UserId;
    var content : Text;
    var image : ?Text;
    likes : Set.Set<UserId>;
    comments : List.List<Comment>;
    createdAt : Timestamp;
    var nextCommentId : CommentId;
  };

  // Shared (serializable) post
  public type Post = {
    id : PostId;
    user : UserId;
    content : Text;
    image : ?Text;
    likes : [UserId];
    comments : [Comment];
    createdAt : Timestamp;
  };

  // Convert internal → public
  public func toPublic(p : PostInternal) : Post {
    {
      id = p.id;
      user = p.user;
      content = p.content;
      image = p.image;
      likes = p.likes.toArray();
      comments = p.comments.toArray();
      createdAt = p.createdAt;
    };
  };

  // Create a new post record
  public func new(id : PostId, caller : UserId, content : Text, image : ?Text) : PostInternal {
    {
      id;
      user = caller;
      var content;
      var image;
      likes = Set.empty<UserId>();
      comments = List.empty<Comment>();
      createdAt = Time.now();
      var nextCommentId = 0;
    };
  };

  // Validate post content: not empty, max 500 chars
  public func validatePost(content : Text) : Result<(), ApiError> {
    let len = content.size();
    if (len == 0) {
      #err(#invalidInput("Post content must not be empty"));
    } else if (len > 500) {
      #err(#invalidInput("Post content must not exceed 500 characters"));
    } else {
      #ok(());
    };
  };

  // Validate comment text: not empty, max 280 chars
  public func validateComment(text : Text) : Result<(), ApiError> {
    let len = text.size();
    if (len == 0) {
      #err(#invalidInput("Comment text must not be empty"));
    } else if (len > 280) {
      #err(#invalidInput("Comment text must not exceed 280 characters"));
    } else {
      #ok(());
    };
  };

  // Create a post and store it; nextId is the current counter value, returns new counter
  public func createPost(
    posts : Map.Map<PostId, PostInternal>,
    nextId : Nat,
    caller : UserId,
    content : Text,
    image : ?Text,
  ) : Result<PostId, ApiError> {
    switch (validatePost(content)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    let post = new(nextId, caller, content, image);
    posts.add(nextId, post);
    #ok(nextId);
  };

  // Retrieve a post by ID
  public func getPost(posts : Map.Map<PostId, PostInternal>, postId : PostId) : ?Post {
    switch (posts.get(postId)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  // Update post content/image; only owner allowed
  public func updatePost(
    posts : Map.Map<PostId, PostInternal>,
    caller : UserId,
    postId : PostId,
    content : Text,
    image : ?Text,
  ) : Result<(), ApiError> {
    switch (validatePost(content)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    switch (posts.get(postId)) {
      case null { #err(#notFound) };
      case (?p) {
        if (not Principal.equal(p.user, caller)) {
          return #err(#unauthorized);
        };
        p.content := content;
        p.image := image;
        #ok(());
      };
    };
  };

  // Delete a post; only owner allowed
  public func deletePost(
    posts : Map.Map<PostId, PostInternal>,
    caller : UserId,
    postId : PostId,
  ) : Result<(), ApiError> {
    switch (posts.get(postId)) {
      case null { #err(#notFound) };
      case (?p) {
        if (not Principal.equal(p.user, caller)) {
          return #err(#unauthorized);
        };
        posts.remove(postId);
        #ok(());
      };
    };
  };

  // Like a post; prevents duplicate likes
  public func likePost(
    posts : Map.Map<PostId, PostInternal>,
    caller : UserId,
    postId : PostId,
  ) : Result<(), ApiError> {
    switch (posts.get(postId)) {
      case null { #err(#notFound) };
      case (?p) {
        if (p.likes.contains(caller)) {
          return #err(#alreadyExists);
        };
        p.likes.add(caller);
        #ok(());
      };
    };
  };

  // Unlike a post
  public func unlikePost(
    posts : Map.Map<PostId, PostInternal>,
    caller : UserId,
    postId : PostId,
  ) : Result<(), ApiError> {
    switch (posts.get(postId)) {
      case null { #err(#notFound) };
      case (?p) {
        p.likes.remove(caller);
        #ok(());
      };
    };
  };

  // Add a comment to a post
  public func addComment(
    posts : Map.Map<PostId, PostInternal>,
    caller : UserId,
    postId : PostId,
    text : Text,
  ) : Result<(), ApiError> {
    switch (validateComment(text)) {
      case (#err(e)) { return #err(e) };
      case (#ok(())) {};
    };
    switch (posts.get(postId)) {
      case null { #err(#notFound) };
      case (?p) {
        let comment : Comment = {
          id = p.nextCommentId;
          user = caller;
          text;
          createdAt = Time.now();
        };
        p.comments.add(comment);
        p.nextCommentId += 1;
        #ok(());
      };
    };
  };

  // Sort posts by createdAt descending
  func sortedPostsDesc(posts : Map.Map<PostId, PostInternal>) : [PostInternal] {
    let all = List.empty<PostInternal>();
    posts.forEach(func(_, p) { all.add(p) });
    let arr = all.toArray();
    arr.sort(func(a : PostInternal, b : PostInternal) : { #less; #equal; #greater } {
      Int.compare(b.createdAt, a.createdAt);
    });
  };

  // Return paginated feed posts from a set of followed users, sorted by createdAt desc
  public func getFeed(
    posts : Map.Map<PostId, PostInternal>,
    following : Set.Set<UserId>,
    page : Nat,
    limit : Nat,
  ) : [Post] {
    let sorted = sortedPostsDesc(posts);
    let filtered = sorted.filter(func(p : PostInternal) : Bool {
      following.contains(p.user);
    });
    let start = page * limit;
    let end_ = start + limit;
    let total = filtered.size();
    if (start >= total) { return [] };
    let actualEnd = if (end_ > total) { total } else { end_ };
    filtered.sliceToArray(start, actualEnd).map<PostInternal, Post>(func(p) { toPublic(p) });
  };

  // Return paginated explore posts (all posts), sorted by createdAt desc
  public func getExplorePosts(
    posts : Map.Map<PostId, PostInternal>,
    page : Nat,
    limit : Nat,
  ) : [Post] {
    let sorted = sortedPostsDesc(posts);
    let start = page * limit;
    let end_ = start + limit;
    let total = sorted.size();
    if (start >= total) { return [] };
    let actualEnd = if (end_ > total) { total } else { end_ };
    sorted.sliceToArray(start, actualEnd).map<PostInternal, Post>(func(p) { toPublic(p) });
  };
};
