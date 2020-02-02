import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/src/theme/appclassic';
import { ResetCSS } from 'common/src/assets/css/style';
import Sticky from 'react-stickynode';
import Navbar from '../containers/AppClassic/Navbar';
import Footer from '../containers/AppClassic/Footer';
import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../containers/AppClassic/appClassic.style';

import SEO from '../components/seo';

import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <SEO
          title={data.wordpressPost.title}
          description={data.wordpressPost.excerpt}
        />
        <ResetCSS />
        <GlobalStyle />

        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-active">
            <Navbar />
          </Sticky>
          <ContentWrapper>


            <h1> {data.wordpressPost.title} </h1>
            <p>
              Written by {data.wordpressPost.author.name} on {data.wordpressPost.date}
            </p>
            <Img sizes={data.wordpressPost.featured_media.localFile.childImageSharp.sizes} alt={data.wordpressPost.title} style={{ maxHeight: 450 }} />
            <div
              style={{ marginTop: 20 }}
              dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
            />


          </ContentWrapper>
          <Footer />
        </AppWrapper>
      </>
    </ThemeProvider>
  );
}

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author
      featured_media {
        localFile {
          childImageSharp {
            sizes(maxWidth: 1200) {
              src
            }
          }
        }
      }
    }
  }
`
