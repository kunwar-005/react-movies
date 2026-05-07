import { Client, Databases,ID, Query } from "appwrite";
const PROJECT_ID = "68bc7c080030abb09efc";
const DATABASE_ID = "68bcf49b0031d98df72a";
const COLLECTION_ID = "68bcf5130015795a7504";

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID)

  const database =  new Databases(client)

  export const updatecount = async (search, movie) => {
    console.log(DATABASE_ID, COLLECTION_ID);
    try {
      // 1. Look for a document where `search` field equals the given search string
      const result = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('search', search)]
      );
  
      // 2. If a document exists, update its count
      if (result.documents.length > 0) {
        const doc = result.documents[0];
  
        await database.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          doc.$id,
          {
            count: doc.count + 1,
          }
        );
      }
      // 3. Otherwise, create a new document
      else {
        await database.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            search, // store the search keyword
            count: 1, // first time, so count = 1
            movie_id: movie.id, // store movie id
            poster_url: `https://media.themoviedb.org/t/p/w500/${movie.poster_path}`, // movie poster
          }
        );
      }
    } catch (E) {
      console.log(E);
    }
  };
  
  export const trendingmovies=async ()=>{
    try{
        // console.log('Fetching trending movies...')

        const result= await database.listDocuments(DATABASE_ID,COLLECTION_ID,[Query.limit(5),Query.orderDesc("count")])

        // console.log('Trending movies result:', result.documents)
        return result.documents;
    }
    catch(e){
        // Appwrite project may be paused or unavailable in development.
        return []; // Fail gracefully with no trending movies.
    }
  }