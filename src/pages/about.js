import Head from "next/head";
import Layout from "../components/layout";
import AllPostsLink from "../components/all-posts-link";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>Aaron Bos - About</title>
      </Head>
        <section>
          <h1 className="mb-4 font-semibold text-2xl">About Me</h1>
          <hr />
          <p className="my-4">
            I am a <span className="font-semibold">software engineer</span> from the Midwest. I received my Bachelor’s degree in Business Administration from the University of Nebraska-Lincoln in 2015 as well as my Associates Degree in Computer Information Technology from a Southeast Community College in 2018.
          </p>
          <p className="my-4">
            While in college I met my wife Lauren. We’ve been married since 2015 and have three amazing young children and two Yorkies.
          </p>
          <p className="my-4">
            I’ve been a part of software teams since my first job as an intern doing business analytics in 2014. From there I transitioned to a full-time Business Analyst and eventually took on the role and responsibilities of a Product Manager. In 2016 I decided to make the transition to software engineering by heading back to school. I was able to begin working as a full-time engineer while still attending school in 2017 and I haven’t looked back.
          </p>
          <p className="my-4">
            Since beginning my career in software my roles have gone from focusing on <span className="font-semibold">end-user satisfaction</span> and business workflows, to solving business problems through <span className="font-semibold">communication with stakeholders</span>, to now <span className="font-semibold">building the software that delights users and provides value to the business</span>.
          </p>
          <p className="my-4">
            I’ve worked on a wide variety of applications and domains, but they’ve all been heavily entrenched in the <span className="font-semibold">.NET</span> ecosystem. I’ve written code in <span className="font-semibold">C#</span> (and VB.NET) using <span className="font-semibold">Web API, MVC</span>, and yes, even Web Forms. I’ve worked with <span className="font-semibold">MS SQL, Postgres</span>, and even a bit with mainframes. I’ve helped my teams make the transition from full .NET Framework to the green fields of <span className="font-semibold">.NET Core</span>.
          </p>
          <p className="my-4">
            If you’d like to get in touch, connect with me via the social links at the bottom of the page. I’d love to hear from you! 
          </p>
          <p className="my-4">
            Happy reading!
          </p>
          <AllPostsLink text="See My Blog Posts" />
        </section>
    </Layout>
  );
}
