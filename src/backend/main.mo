// Composition root — owns all state, delegates to mixins
import Map "mo:core/Map";
import List "mo:core/List";
import UserLib "lib/user";
import PostLib "lib/post";
import UserApiMixin "mixins/user-api";
import PostApiMixin "mixins/post-api";

actor {
  // User state: Principal → UserInternal
  let users = Map.empty<UserLib.UserId, UserLib.UserInternal>();

  // Post state: PostId → PostInternal
  let posts = Map.empty<PostLib.PostId, PostLib.PostInternal>();

  // Mutable post ID counter stored in a single-element List (mutable box)
  let nextPostIdBox = List.singleton<Nat>(0);

  // Wire mixins
  include UserApiMixin(users);
  include PostApiMixin(users, posts, nextPostIdBox);
};
