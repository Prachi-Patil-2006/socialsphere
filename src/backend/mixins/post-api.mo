// Post API mixin — exposes public endpoints for posts, likes, comments, and feed
import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import CommonTypes "../types/common";
import UserLib "../lib/user";
import PostLib "../lib/post";

mixin (
  users : Map.Map<UserLib.UserId, UserLib.UserInternal>,
  posts : Map.Map<PostLib.PostId, PostLib.PostInternal>,
  nextPostIdBox : List.List<Nat>,
) {

  // Create a new post
  public shared ({ caller }) func createPost(
    content : Text,
    image : ?Text,
  ) : async CommonTypes.Result<PostLib.PostId, CommonTypes.ApiError> {
    // Caller must be registered
    switch (users.get(caller)) {
      case null { return #err(#unauthorized) };
      case (?_) {};
    };
    let currentId = switch (nextPostIdBox.first()) {
      case (?id) { id };
      case null { 0 };
    };
    switch (PostLib.createPost(posts, currentId, caller, content, image)) {
      case (#err(e)) { #err(e) };
      case (#ok(postId)) {
        // Advance counter
        if (nextPostIdBox.isEmpty()) {
          nextPostIdBox.add(currentId + 1);
        } else {
          nextPostIdBox.put(0, currentId + 1);
        };
        #ok(postId);
      };
    };
  };

  // Get a single post by ID
  public query func getPost(postId : PostLib.PostId) : async ?PostLib.Post {
    PostLib.getPost(posts, postId);
  };

  // Update a post (only owner)
  public shared ({ caller }) func updatePost(
    postId : PostLib.PostId,
    content : Text,
    image : ?Text,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    PostLib.updatePost(posts, caller, postId, content, image);
  };

  // Delete a post (only owner)
  public shared ({ caller }) func deletePost(
    postId : PostLib.PostId,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    PostLib.deletePost(posts, caller, postId);
  };

  // Like a post (prevents duplicates)
  public shared ({ caller }) func likePost(
    postId : PostLib.PostId,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    PostLib.likePost(posts, caller, postId);
  };

  // Unlike a post
  public shared ({ caller }) func unlikePost(
    postId : PostLib.PostId,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    PostLib.unlikePost(posts, caller, postId);
  };

  // Add a comment to a post
  public shared ({ caller }) func addComment(
    postId : PostLib.PostId,
    text : Text,
  ) : async CommonTypes.Result<(), CommonTypes.ApiError> {
    PostLib.addComment(posts, caller, postId, text);
  };

  // Get paginated feed (posts from followed users, newest first)
  public query ({ caller }) func getFeed(page : Nat, limit : Nat) : async [PostLib.Post] {
    let following = UserLib.getFollowingSet(users, caller);
    PostLib.getFeed(posts, following, page, limit);
  };

  // Get paginated explore posts (all posts, newest first)
  public query func getExplorePosts(page : Nat, limit : Nat) : async [PostLib.Post] {
    PostLib.getExplorePosts(posts, page, limit);
  };

};
