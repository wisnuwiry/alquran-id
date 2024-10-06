interface MetadataProps {
    pageName: string,
    path: string
}

export default function Metadata({ pageName, path }: MetadataProps) {
    const description = "Aplikasi Al-Quran digital untuk membaca dan mengamalkan kitab suci Al-Quran"
    
    return <>
        <meta name="name" content={pageName} />
        <title>{pageName}</title>
        <meta name="description" content={description} />

        {/* Scrapper */}
        <meta content="index,follow" name="googlebot" />
        <meta content="follow, all" name="Googlebot-Image" />
        <meta content="follow, all" name="Scooter" />
        <meta content="follow, all" name="msnbot" />
        <meta content="follow, all" name="alexabot" />
        <meta content="follow, all" name="Slurp" />
        <meta content="follow, all" name="ZyBorg" />
        <meta content="follow, all" name="Scooter" />
        <meta content="true" name="MSSmartTagsPreventParsing" />
        <meta content="ALL" name="SPIDERS" />
        <meta content="ALL" name="WEBCRAWLERS" />
        <meta content="aeiwi, alexa, alltheWeb, altavista, aol netfind, anzwers, canada, directhit, euroseek, excite, overture, go, google, hotbot. infomak, kanoodle, lycos, mastersite, national directory, northern light, searchit, simplesearch, Websmostlinked, webtop, what-u-seek, aol, yahoo, webcrawler, infoseek, excite, magellan, looksmart, bing, cnet, googlebot" name="search engines" />
        <meta property="og:title" content={pageName} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}${path}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/default_preview.jpg`} />
        <meta property="og:locale" content="id" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/default_preview.jpg`} />
        <meta name="twitter:title" content={pageName} />
        <meta name="description" content={description} />
        <meta name="twitter:site" content="@wsme_dev" />
    </>
}

