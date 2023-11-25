const axios = require('axios');
const cheerio = require('cheerio');

const Contest = require('../../src/models/Contest');

exports.crawling = (req, res) => {
  // 크롤링할 웹사이트 URL
  const url = 'https://www.kku.ac.kr/user/boardList.do?boardId=1584&siteId=wwwkr&id=wwwkr_070306000000';
  const contest = new Contest();

  axios.get(url)
    .then((response) => {
      const html = response.data;

      // HTML 파싱
      const $ = cheerio.load(html);

      // 요소 선택 및 데이터 추출
      $('tbody > tr').each((index, element) => {
        const bTitle = $(element).find('td.b_title a').text().trim();
        const bTitleURL = $(element).find('td.b_title a').attr('href');
        const bName = $(element).find('td.b_name').text().trim();
        const bEtc = $(element).find('td.b_etc').first().text().trim();
        
        const contestData = {
          title: bTitle,
          host: bName,
          url: 'www.kku.ac.kr/user/' + bTitleURL,
          date: bEtc
        }
        
        contest.createContest(contestData, (err, result) => {
          if (err) {
            console.error('크롤링 오류:', err);
            console.log('크롤링 데이터 생성 실패');
          } else {
            console.log('크롤링 데이터 생성 성공');
          }
        });
      });
    })
    .catch((error) => {
      console.error('에러 발생:', error);
    });
};