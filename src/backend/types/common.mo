// Cross-cutting types shared across all domains
module {
  public type UserId = Principal;
  public type PostId = Nat;
  public type CommentId = Nat;
  public type Timestamp = Int;

  // Shared Result type for API responses
  public type Result<T, E> = { #ok : T; #err : E };
  public type ApiError = {
    #notFound;
    #unauthorized;
    #alreadyExists;
    #invalidInput : Text;
    #selfAction; // e.g., cannot follow yourself
  };
};
