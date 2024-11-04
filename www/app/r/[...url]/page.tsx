import Home from "@/app/home";
import { getPromptFromURL } from "@/utils/helpers";

// This page performs server-side rendering to process the URL using jina
// and return the parsed content to the core Chat react component as input
// ? per Next.js routing conventions on accessing dynamic route data
export default async function Page({
  params,
}: {
  params: { url: string[] };
}) {
  // Handle the protocol separately
  if (params.url.length < 2) {
    throw Error("Page not found");
  }
  console.log(params.url)
  // Extract and fix the protocol
  const protocol = params.url[0].replace('%3A', ':');
  // Join the rest of the URL parts
  const restOfUrl = params.url.slice(1).join('/');
  // Construct the full URL with proper protocol separator
  console.log('URL parts:', params.url);
  console.log('Protocol:', protocol);
  console.log('Rest of URL:', restOfUrl);
  const fullUrl = `${protocol}//${restOfUrl}`;
  console.log('Final URL:', fullUrl);
  console.log(`Processing URL: ${fullUrl}`);
  // Validate the URL starts with http or https
  if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    throw new Error('Page not found');
  }

  const { parsedUrlContent } = await getPromptFromURL(fullUrl);
  return (
    <Home
      parsedUrlContent={parsedUrlContent}
      url={fullUrl}
    />
  );
}