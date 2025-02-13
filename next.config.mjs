/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "styxzwuyymfdbvsfgfky.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin_images/**",
        search: "",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
