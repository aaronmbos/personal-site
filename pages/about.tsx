import Head from "next/head";
import Layout from "../components/layout";
import AllPostsLink from "../components/all-posts-link";
import Image from "next/image";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Aaron Bos - About</title>
      </Head>
      <section>
        <h1 className="mb-4 font-semibold text-2xl">About Me</h1>
        <hr />
        <div className="mt-4 text-center">
          <Image
            className="rounded-full m-auto"
            src="https://res.cloudinary.com/aaron-bos/image/upload/v1666052817/20221017_HudlHeadshots_AaronBos-5_iggfs3.jpg"
            alt="Aaron's picture"
            height="200"
            width="200"
          />
        </div>
        <p className="my-4">
          I am a <span className="font-semibold">software engineer</span> from
          the midwest United States currently working as a Senior Engineer at
          Hudl, a sports technology company that focuses on empowering teams and
          athletes with video and data.
        </p>
        <p className="my-4">
          I’ve been a part of software teams since my first job as an intern
          doing business analytics in 2014. From there I transitioned to a
          full-time Business Analyst and eventually took on the role and
          responsibilities of a Product Manager. In 2016 I decided to make the
          transition to software engineering by heading back to school. I was
          able to begin working as a full-time engineer while still attending
          school in 2017 and I haven’t looked back.
        </p>
        <p className="my-4">
          Since beginning my career in software my roles have gone from focusing
          on <span className="font-semibold">end-user satisfaction</span> and
          business workflows, to solving business problems through{" "}
          <span className="font-semibold">communication with stakeholders</span>
          , to now{" "}
          <span className="font-semibold">
            building the software that delights users and provides value to the
            business
          </span>
          . Recently I’ve spent time as an engineering manager which provided me
          with an opportunity to focus on{" "}
          <span className="font-semibold">growing team members</span> and making
          sure my team worked on the right projects, at the right time, and at
          the right pace to make a positive impact on business outcomes.
        </p>
        <p className="my-4">
          I’ve worked on a wide variety of applications and domains, but they’ve
          all been heavily entrenched in the{" "}
          <span className="font-semibold">.NET</span> ecosystem. I’ve written
          code in <span className="font-semibold">C#</span> (and VB.NET) using{" "}
          <span className="font-semibold">Web API, MVC</span>, and yes, even Web
          Forms. I’ve worked with{" "}
          <span className="font-semibold">MS SQL, Postgres</span>, and even a
          bit with mainframes. Recently I’ve enjoyed getting closely familiar
          with{" "}
          <span className="font-semibold">
            video technologies, the AWS ecosystem, Python, and MongoDB
          </span>{" "}
          as part of my role at Hudl. I pride myself in writing code that is{" "}
          <span className="font-semibold">readable</span> and{" "}
          <span className="font-semibold">testable</span>. I also believe that
          the best way to understand a topic is to teach it to someone else.
        </p>
        <p className="my-4">
          If you’d like to get in touch, connect with me via the social links at
          the bottom of the page. I’d love to hear from you!
        </p>
        <p className="my-4">Happy reading!</p>
        <AllPostsLink text="See all my posts" />
      </section>
    </Layout>
  );
}
