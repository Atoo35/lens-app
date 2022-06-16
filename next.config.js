/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:[
      'ipfs.infura.io',
      "statics-polygon-lens.s3.eu-west-1.amazonaws.com",
      "statics-mumbai-bean-staging.s3.eu-west-1.amazonaws.com",
      "avatar.tobi.sh"
    ]
  }
}

module.exports = nextConfig
