const {
  default: createTypography,
} = require("@material-ui/core/styles/createTypography");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        products: allStrapiProduct {
          edges {
            node {
              name
              strapiId
              category {
                name
              }
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
              name
              description
              filterOptions {
                Size {
                  checked
                  label
                }
                Style {
                  checked
                  label
                }
                Color {
                  checked
                  label
                }
              }
            }
          }
        }
      }
    `
  );

  if (result.error) {
    throw result.error;
  }

  const products = result.data.products.edges;
  const categories = result.data.categories.edges;

  products.forEach((product) => {
    createPage({
      path: `/${product.node.category.name.toLowerCase()}/${encodeURIComponent(
        product.node.name.split(" ")[0]
      )}`,
      component: require.resolve("./src/templates/ProductDetail.js"),
      context: {
        name: product.node.name,
        id: product.node.strapiId,
        category: product.node.category.name,
      },
    });
  });

  categories.forEach((categorie) => {
    createPage({
      path: `/${categorie.node.name.toLowerCase()}`,
      component: require.resolve("./src/templates/ProductList.js"),
      context: {
        name: category.node.name,
        description: category.node.description,
        id: category.node.strapiId,
        filterOptions: category.node.filterOptions,
      },
    });
  });
};
