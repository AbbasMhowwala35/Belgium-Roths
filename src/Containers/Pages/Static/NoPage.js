import React from 'react'
import { Helmet } from 'react-helmet'
import image from '../../../Assets/images/404.png'
export default function NoPage() {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Belgium Webnet & Diamond Specialists - Charlotte's Home for Fine Jewelry, Diamonds & Engagement Rings</title>
                <meta name="description" content=""></meta>
                <meta name="keywords" content=""></meta>
            </Helmet>

            <img style={{margin: '100px auto',display:"block", width: "200px"}} src={image} />
        </div>
    )
}
