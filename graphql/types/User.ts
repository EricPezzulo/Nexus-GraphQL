import { Link } from "./Link";
import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.string("image");
    t.field("role", { type: Role });
    t.list.field("bookmarks", {
      type: Link,
      async resolve(parent, _args, context) {
        return await context.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .bookmarks();
      },
    });
  },
});

const Role = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});

export const UsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_parent, _args, context) {
        return context.prisma.user.findMany();
      },
    });
  },
});
