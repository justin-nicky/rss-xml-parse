import express from 'express'
import cors from 'cors'
import rssParser from 'rss-parser'
import 'express-async-errors'

const app = express()
app.use(cors())
let parser = new rssParser()

app.get('/rss/read', async (req, res) => {
    const url = 'https://techcrunch.com/feed/'
    //'https://malayalam.oneindia.com/rss/malayalam-abroad-fb.xml'
    //'https://www.zeebiz.com/it.xml'
    let feed, newFeed = {}

    // read the RSS feed
    try {
        feed = await parser.parseURL(url);
    } catch (error) {
        return res.status(500).send(error)
    }
    
    if(!feed) {
        return res.status(404).send('No data found')
    }
    
    // select the necessary feilds
    newFeed.feeds = feed.items.map(_item => {
        return {
            siteTitle: feed.title ?? '',
            siteUrl: feed.link ?? '',
            title: _item.title ?? '',
            description: _item.content ?? '',
            image: _item?.enclosure?.url ?? '',
            author: _item.creator?? '',
            url: _item.link ?? '',
            publishedDate: _item.pubDate ?? ''
        }
    })
    
    // return the feed as JSON
    return res.json(newFeed)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


// const url = 'https://techcrunch.com/feed/'
// //'https://malayalam.oneindia.com/rss/malayalam-abroad-fb.xml'
// //'https://www.zeebiz.com/it.xml'

// const urls = ['https://techcrunch.com/feed/',
// 'https://malayalam.oneindia.com/rss/malayalam-abroad-fb.xml',
// 'https://www.zeebiz.com/it.xml']

// let feed, newFeed = {}, feeds = []

// // read the RSS feed
// try {
//     //feed = await parser.parseURL(url);
//     feeds = await Promise.all(urls.map(url => parser.parseURL(url))
//     //.catch(error => null))
//     )
//     //feeds = feeds.filter(_feed => _feed !== null)
// } catch (error) {
//     return res.status(500).send(error)
// }

// // if(!feed) {
// //     return res.status(404).send('No data found')
// // }

// // select the necessary feilds
// // newFeed.feeds = feed.items.map(_item => {
// //     return {
// //         siteTitle: feed.title ?? '',
// //         siteUrl: feed.link ?? '',
// //         title: _item.title ?? '',
// //         description: _item.content ?? '',
// //         image: _item?.enclosure?.url ?? '',
// //         author: _item.creator?? '',
// //         url: _item.link ?? '',
// //         publishedDate: _item.pubDate ?? ''
// //     }
// // })

// // return the feed as JSON
// return res.json(feeds)