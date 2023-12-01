import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "@/utils/sanity";
import { Post } from "@/utils/typings";

interface Props {
  posts: [Post];
}
export function Index(props: Props) {
  const { posts } = props;

  return (
    <>
      <br></br>
      <div className="h-18 mx-auto px-5 flex items-center justify-around">
        <div>
          <Image
            src="/static/photo-testdnd.avif"
            alt="dnd image"
            height={200}
            width={200}
          />
        </div>

        <div className="bg-white">
          <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
              <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Welcome to the Land of Eldari!
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Check the status of recent orders, manage returns, and
                  discover similar products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* this is where the area for the posts starts */}

      <div className="max-w-7x1 mx-auto">
        {/* posts */}
        <div className="p-3 gap-3 grid grid-cols-1 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 ">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border rounded-lg group cursor-pointer overflow-hidden">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="test-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
      title,
      author -> {
        name,
        image
      },
      description,
      mainImage,
      slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

export default Index;
