/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/summary",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
