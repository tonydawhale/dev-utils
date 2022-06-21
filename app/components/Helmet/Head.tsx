import { Helmet } from 'react-helmet';

interface HeadProps {
    title: string;
    description: string;
}

export default function Head({ title, description }: HeadProps ) {
    return (
        <Helmet
            defer={false}
            htmlAttributes={{ lang: 'en' }}
            title={title}
            meta={[
                {
                    charSet: 'utf-8',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, user-scalable=no'
                },
                {
                    name: 'description',
                    content: description
                },
                {
                    property: 'og:title',
                    content: title
                },
                {
                    property: 'og:description',
                    content: description,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
                {
                    name: 'twitter:description',
                    content: description,
                }
            ]}
        />
    )
}
