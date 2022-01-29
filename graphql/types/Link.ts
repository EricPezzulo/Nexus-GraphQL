import { objectType, extendType } from "nexus";
import { User } from "./User";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("url");
    t.string("description");
    t.string("imageUrl");
    t.string("category");
    t.list.field("users", {
      type: User,
      async resolve(parent, _args, context) {
        return await context.prisma.link
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users();
      },
    });
  },
});

export const LinksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("links", {
      type: "Link",
      resolve(_parent, _args, context) {
        return context.prisma.link.findMany();
      },
    });
  },
});

// export const CreateLinkMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("createLink", {
//       type: Link,
//       args: {
//         title: nonNull(stringArg()),
//         url: nonNull(stringArg()),
//         imageUrl: nonNull(stringArg()),
//         category: nonNull(stringArg()),
//         description: nonNull(stringArg()),
//       },
//       async resolve(_parent, args, ctx) {
//         if (!ctx.user) {
//           throw new Error(`You need to be logged in to perform an action`);
//         }

//         const newLink = {
//           title: args.title,
//           url: args.url,
//           imageUrl: args.imageUrl,
//           category: args.category,
//           description: args.description,
//         };

//         return await ctx.prisma.link.create({
//           data: newLink,
//         });
//       },
//     });
//   },
// });
