export default function Intro() {
  return (
    <>
      <h1 className="my-3 text-2xl font-bold">
        Hey! &#128075;
      </h1>
      <h2 className="my-3 text-xl font-semibold">
        My name is Aaron Bos and this is my blog.
      </h2>
      <div className="my-2 font-medium font-lg">
        <p className="mb-1">
          <span className="italic">What do I blog about?</span> Great question!
        </p>
        <p className="mb-1">
          I'm a <span className="font-semibold">software engineer</span> by day so you'll mostly see posts, some technical and some not-so-technical, relating to my interests in <span className="font-semibold">software</span> and <span className="font-semibold">technology</span>. 
        </p>
        <p className="mb-1">
          If anything I write about interests you, connect with me via social to let me know! I hope you enjoy my posts as much as I enjoy writing them.
        </p>
      </div>
    </>
  );
}