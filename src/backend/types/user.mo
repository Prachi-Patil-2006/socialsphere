// User domain types
import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  // Internal user type — uses mutable fields for profile updates
  public type UserInternal = {
    id : UserId;
    var username : Text;
    var bio : Text;
    var profilePicture : Text;
    followers : SetPrincipal; // Set<Principal> — type alias below
    following : SetPrincipal;
    createdAt : CommonTypes.Timestamp;
  };

  // Opaque alias to avoid importing Set here — resolved in lib
  public type SetPrincipal = Any;

  // Public (shared) user type returned to callers
  public type User = {
    id : UserId;
    username : Text;
    bio : Text;
    profilePicture : Text;
    followers : [UserId];
    following : [UserId];
    createdAt : CommonTypes.Timestamp;
  };
};
