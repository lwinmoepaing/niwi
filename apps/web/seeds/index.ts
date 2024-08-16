import "dotenv/config";
import useSeeds from "./user.seed";
import blogSeeds from "./blog.seed";

(async () => {
  await useSeeds();
  await blogSeeds();
})();
