const mongoose = require('mongoose')
const Destination = require('../models/japan/destination')
const User = require('../models/user')

const { dbURI } = require('../config/environment')

const access = {
  tokyo: [1, 2, 3, 4, 5],
  kyoto: [0, 2, 3, 5, 6],
  hakone: [0, 1],
  kanazawa: [0, 1, 4, 6],
  takayama: [1, 3, 5, 6],
  kisoValley: [0, 1, 4, 6],
  hiroshima: [1, 3, 4, 5]
}


// ! Upon run, connects to the mongoDB through mongoose, drops the database and then recreates with seed documents and closes the connection
mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'Jos',
            email: 'jos@email',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ])
      })
      .then(() => {
        return Destination.create([
          {
            name: 'Tokyo',
            nameId: 'tokyo',
            region: 'Kanto',
            imageURL: 'https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=2850&q=80',
            rating: 5,
            description: 'Tokyo (東京, Tōkyō) is Japan\'s capital and the world\'s most populous metropolis',
            maxStay: 7,
            popularity: 'Golden Route',
            tags: ['Must', 'Culture', 'City'],
            access: []
          },
          {
            name: 'Kyoto',
            nameId: 'kyoto',
            region: 'Kansai',
            imageURL: 'https://images.unsplash.com/photo-1449509054340-b0c11c014a2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
            rating: 5,
            description: 'Kyoto (京都, Kyōto) served as Japan\'s capital and the emperor\'s residence from 794 until 1868',
            maxStay: 7,
            popularity: 'Golden Route',
            tags: ['Culture', 'City', 'Must'],
            access: []
          }, 
          {
            name: 'Hakone',
            nameId: 'hakone',
            region: 'Kanto',
            imageURL: 'https://webimages.trailfinders.com/image/fetch/dpr_auto,q_auto,f_auto,w_1920,c_limit/https://images.trailfinders.com/asset/173f15/TF1523476/Depositphotos_58021457_xl-2015-2_1920x1920.jpg',
            rating: 2,
            description: 'Hakone (箱根) is part of the Fuji-Hakone-Izu National Park, less than one hundred kilometers from Tokyo. It is famous for hot springs, natural beauty and the view across Lake Ashinoko of nearby Mount Fuji',
            maxStay: 2,
            popularity: 'Golden Route',
            tags: ['Culture', 'City', 'Onsen', 'Family', 'Mountains', 'Rural'],
            access: []
          },
          {
            name: 'Kanazawa',
            nameId: 'kanazawa',
            region: 'Chubu',
            imageURL: 'https://cdn.audleytravel.com/-/-/79/1314569-kenrokuen-garden-in-kanazawa.webp',
            rating: 4,
            description: 'Kanazawa remains an important city in its region and serves as the capital of Ishikawa Prefecture. The city boasts many historical attractions such as restored residences and districts, as well as modern museums',
            maxStay: 3,
            popularity: 'Off the Beaten Track',
            tags: ['Culture', 'City', 'Family', 'Mountains'],
            access: []
          },
          {
            name: 'Takayama',
            nameId: 'takayama',
            region: 'Chubu',
            imageURL: 'https://imgcp.aacdn.jp/img-a/1720/auto/global-aaj-front/article/2018/05/5b0b7d81c3863_5b0b667ba922b_759212706.jpg',
            rating: 3,
            description: 'Takayama (高山) is a city in the mountainous Hida region of Gifu Prefecture. It gained importance as a source of high quality timber and highly skilled carpenters during the feudal ages.',
            maxStay: 2,
            popularity: 'Golden Route',
            tags: ['Culture', 'City', 'Family', 'Mountains', 'Rural'],
            access: []
          }, 
          {
            name: 'Kiso Valley',
            nameId: 'kisoValley',
            region: 'Chubu',
            imageURL: 'https://instagram.flhr3-2.fna.fbcdn.net/v/t51.2885-15/e35/24125086_2008317152769854_2278631397801328640_n.jpg?_nc_ht=instagram.flhr3-2.fna.fbcdn.net&_nc_cat=102&_nc_ohc=DXgDEgtP6mYAX8NKk2S&oh=4a81c423dca8406fd384df8ff2e4a099&oe=5ED9FC45',
            rating: 4,
            description: 'The Kiso Valley (木曽路, Kisoji) is located in Nagano Prefecture, and runs alongside the mountains of the Central Alps. Along the Kiso Valley, a few post towns, particularly Magome, Tsumago and Narai, have been preserved to look as they did when they served travelers of the Nakasendo',
            maxStay: 3,
            popularity: 'Off the Beaten Track',
            tags: ['Culture', 'Mountains', 'Rural', 'Onsen', 'Adventure'],
            access: []
          },
          {
            name: 'Hiroshima',
            nameId: 'hiroshima',
            region: 'Chugoku',
            imageURL: 'https://www.fodors.com/wp-content/uploads/2019/04/Miyajima-Happy-Island_Hero.jpg',
            rating: 5,
            description: 'Hiroshima (広島) is the principal city of the Chugoku Region and home to over a million inhabitants. After the war, great efforts were taken to rebuild the city. Predictions that the city would be uninhabitable proved false. Destroyed monuments of Hiroshima\'s historical heritage, like Hiroshima Castle and Shukkeien Garden, were reconstructed.',
            maxStay: 3,
            popularity: 'Off the Beaten Track',
            tags: ['Culture', 'Family', 'Mountains', 'Rural', 'Onsen'],
            access: []
          }
        ])
      })
      // .then(createdDestinations => {
      //   // createdDestinations.forEach(dest => console.log(dest.nameId))
      //   createdDestinations.map(dest => {
      //     // console.log(dest)
      //     access[dest.nameId].forEach(number => {
      //       // console.log(number)
      //       dest.access.push(createdDestinations[number])
      //     })
      //     // console.log(dest)
      //     return dest.save()
      //     // console.log(createdDestinations)
      //     // console.log(dest)
      //     // dest.access.p
      //     // return dest.access
      //   })
      //   // console.log(createdDestinations)
      //   return createdDestinations
      //   // return createdDestinations
      // })
      .then(createdDestinations => console.log(`You have created ${createdDestinations.length} destinations`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  }
)