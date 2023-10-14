/** @type {import('next').NextConfig} */
const nextConfig = {
};

module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
                // by next.js will be dropped. Doesn't make much sense, but how it is
            fs: false, // the solution
            net: false,
            tls: false,
            child_process: false,
            dns: false,
            encoding: false,
            aws4: false,
            socks: false,
            snappy: false,
            
        };

        return config;
    },
};