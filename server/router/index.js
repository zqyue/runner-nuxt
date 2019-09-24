const router = require('koa-router')()

const axios = require('axios').create()
const cheerio = require('cheerio')

router.get('/score',async ctx=>{
  let query = ctx.request.query
  try{
    let score=await getScore(query.infoUrl)
    ctx.body={
      code:200,
      data:{
        score:score
      },

    }
  }catch (e) {
    ctx.body={
      code:200,
      data:{
        score:null
      },

    }
  }


})
router.get('/fetch', async ctx => {

  let query = ctx.request.query
  if (!query.surname || !query.name) {
    ctx.body = {
      code: 200,
      message: '参数格式不正确'
    }
    return
  }


  try{
    let runnerData= await axios.post('https://itra.run/fiche.php',
      {
        pnom: query.name,
        nat: 'CHN',
        mode: 'search',
        nom: query.surname,
      },
      {
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    })


    let $ = cheerio.load(runnerData.data);

    let arr = []
    $('.fc').each((index, ele) => {
      let id = $(ele).attr('id')
      arr.push({
        url: $(ele).data('url'),
        title: $('#' + id + ' .tit').text(),
        info: $('#' + id + ' .info').text()
      })
    })

    if (arr.length === 1) {
    let score=await getScore('https://itra.run' + arr[0].url)
      ctx.body={
        code:200,
        data:{
          score:score
        },
      }
    }
    else {
      ctx.body={
        code:200,
        data:{
          list:arr
        },
      }

    }

  }catch (e) {
    ctx.body={
      code:200,
      data:{
        list:[]
      },
    }
  }

})

async  function getScore(url){
  try{
    let data=await axios.get(url)

    let $ = cheerio.load(data.data);
    let score = $('tr:first-child b:first-child ').text()
    return score

  }catch (e) {
    throw e

  }


}
module.exports = router


