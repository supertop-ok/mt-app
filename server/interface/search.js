import Router from 'koa-router';
import axios from './utils/axios'
import Poi from '../dbs/models/poi'


let router = new Router({prefix: '/search'})

const sign = '5e04975e0faaeedb91670b8bf83eb442';

router.get('/top', async (ctx) => {
    // try {
    //   let top = await Poi.find({
    //     'name': new RegExp(ctx.query.input),
    //     city: ctx.query.city
    //   })
    //   ctx.body = {
    //     code: 0,
    //     top: top.map(item => {
    //       return {
    //         name: item.name,
    //         type: item.type
    //       }
    //     }),
    //     type: top.length ? top[0].type : ''
    //   }
    // } catch (e) {
    //   ctx.body = {
    //     code: -1,
    //     top: []
    //   }
    // }
    let {status, data: {
        top
      }} = await axios.get(`http://cp-tools.cn/search/top`, {
      params: {
        input: ctx.query.input,
        city: ctx.query.city,
        sign
      }
    })
    ctx.body = {
      top: status === 200
        ? top
        : []
    }
  }) 

  router.get('/hotPlace',async (ctx)=>{
      let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
      let {status,data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
          params:{
              sign,
              city
          }
      })
      ctx.body = {
          result :status === 200 ?result : []
      }
  })

  router.get('/resultsByKeywords', async (ctx) => {
    const {city, keyword} = ctx.query;
    let {
      status,
      data: {
        count,
        pois
      }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        city,
        keyword,
        sign
      }
    })
    ctx.body = {
      count: status === 200 ? count : 0,
      pois: status === 200
        ? pois
        : []
    }
  })
export default router