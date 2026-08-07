import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f24a8e398612ae4e887da429a4ed7a0629642828', queries,  });
export default client;
  