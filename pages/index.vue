<template>
  <div class="home">
    <section class="top">{{score}}</section>

    <section class="content">
      <input type="text" placeholder="姓" v-model.trim="params.surname"/>

      <input type="text" placeholder="名" v-model.trim="params.name"/>

      <div class="button" @click.stop="search">{{isSearch?'查询中...':'查询'}}</div>

      <ul v-if="resultList" class="list">
        <div style="text-align: left;border-bottom: none;margin-bottom: 10px">
          {{resultList.length?'查询到以下结果，请选择：':'暂无查询结果'}}
        </div>
        <li v-for="item in resultList" @click.stop="getScore(item.url)">
          <span style="margin-right: 20px">{{item.title}}</span>
          <span>{{item.info}}</span>
        </li>
      </ul>

    </section>

  </div>
</template>

<script>
  import {fetchData, getScore} from "../api/index";
  import {adapt} from "../until";

  // import Cheerio from 'cheerio'

  function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }

  export default {
    name: 'index',
    components: {
      // HelloWorld
    },
    data() {
      return {
        params: {
          surname: '',
          name: ''
        },
        isSearch: false,
        resultList: null,
        score: null
      }
    },
    mounted() {
      adapt(document, window)
    },
    methods: {
      getScore(url) {
        let params = {
          infoUrl: 'https://itra.run' + url
        }
        this.isSearch = true
        getScore(params).then(res => {
          if(!res.data.score){
            alert('数据获取失败')
            return
          }
          this.score=res.data.score
          //
        }).catch(error=>{

        }).finally(()=>{
            this.isSearch=false

        })

      },
      search() {
        if(this.isSearch){
          return
        }
        if (!this.params.surname || !this.params.name) {
          alert('请补全参数')
          return
        }
        this.score = null
        this.isSearch = true
        this.resultList = null
        fetchData(this.params).then(res => {
          if(!res.data){
            return
          }

          if(res.data.score){
            this.score=res.data.score
            return
          }
          if(res.data.list){
            this.resultList = res.data.list
            return
          }

        }).catch(error=>{

        }).finally(()=>{
          this.isSearch=false


        })

      }

    }
  }
</script>
<style scoped>
  .list{
    font-size: .3rem;
    padding-left: 0;
  }

  .top {
    background-color: rgba(111, 164, 36, .8);
    height: 300px;
    color: white;
    text-align: center;
    line-height: 300px;
    font-size: 1rem;
  }

  .content {
    padding: 0 .6rem;
  }

  input {
    width: 100%;
    display: block;
    border: 1px solid rgb(220, 220, 220);
    outline: none;
    height: .65rem;
    line-height: .65rem;
    /*width: 5rem;*/
    margin: .5rem auto;
    display: block;
    padding-left: .3rem;
    /*lin*/
  }

  .button {
    height: .65rem;
    line-height: .65rem;
    /*width: 5rem;*/
    display: block;
    background-color: rgb(111, 164, 36);
    color: white;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    font-size: .3rem;

  }

  ul {
    text-align: center;
    margin-top: 30px;
  }

  li {
    border-bottom: 1px solid rgb(220, 220, 220);
    display: block;
    text-align: left;
    padding-left: 10px;
    /*display: flex;*/
    /*justify-content: space-between;*/

  }


</style>
