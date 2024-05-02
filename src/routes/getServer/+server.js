import { env } from '$env/dynamic/private'

export function GET({ url } ) 
{
    console.log("get method called getServer: ", env.VITE_APISERVER)
    return new Response(JSON.stringify({apiServer: env.VITE_APISERVER}));
}