// Post domain types
import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type PostId = CommonTypes.PostId;
  public type CommentId = CommonTypes.CommentId;

  // Comment stored inside a post (immutable after creation)
  public type Comment = {
    id : CommentId;
    user : UserId;
    text : Text;
    createdAt : CommonTypes.Timestamp;
  };

  // Internal post type — mutable fields for likes/comments/content
  public type PostInternal = {
    id : PostId;
    user : UserId;
    var content : Text;
    var image : ?Text;
    likes : SetPrincipal; // Set<Principal> — resolved in lib
    comments : CommentList; // List<Comment> — resolved in lib
    createdAt : CommonTypes.Timestamp;
    var nextCommentId : CommentId;
  };

  // Opaque aliases — resolved in lib
  public type SetPrincipal = Any;
  public type CommentList = Any;

  // Public (shared) post type returned to callers
  public type Post = {
    id : PostId;
    user : UserId;
    content : Text;
    image : ?Text;
    likes : [UserId];
    comments : [Comment];
    createdAt : CommonTypes.Timestamp;
  };
};
