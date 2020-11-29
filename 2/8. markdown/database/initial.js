const TYPE = require('./type.js')

function fn_about_me(db) {
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_about_myself (name TEXT , email TEXT, UNIQUE(name, email))',
    (err) => {
      if (!err) {
        db.run(
          "INSERT OR IGNORE INTO tbl_about_myself (name, email) VALUES ('DOPT', 'armigar@naver.com')"
        )
      }
    }
  )
}

function fn_resume(db) {
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_my_resume (date DATE, title TEXT, content TEXT, url TEXT, UNIQUE(date, title))',
    (err) => {
      if (!err) {
        const resume = [
          {
            date: '1980-11-27',
            title: '탄생',
            content: '널리 이롭게 하라는 홍익인간의 뜻을 담아 탄생!!',
            url: null,
          },
          {
            date: '2003-01-01',
            title: 'Play Ground Gaming Inc.',
            content:
              '당시 게임 시장에 대한 정확한 분석과 정보를 바탕으로 사람들의 게임에 대한 알권리를 제공하는 Play Ground Gameing Inc. 에 Journalist로 입사.',
            url: null,
          },
          {
            date: '2014-01-01',
            title: 'DOPT 생성',
            content:
              '사람들에게 더욱 더 많은 프로그램을 배포하고자 하는 목적으로 Dong Project Team이라는 팀을 생성.',
            url: 'https://www.facebook.com/dongprojectteam',
          },
        ]
        resume.forEach((item) => {
          const query = `INSERT OR IGNORE INTO tbl_my_resume (date,title,content,url) VALUES ('${item.date}', '${item.title}', '${item.content}', '${item.url}')`
          db.run(query)
        })
      }
    }
  )
}

function fn_applications(db) {
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_applications (id INT, name TEXT , content TEXT, date DATE, platform TEXT, url TEXT, image TEXT, UNIQUE(name, date))',
    (err) => {
      if (!err) {
        const applications = [
          {
            id: 1,
            name: '힘을 찾아런',
            content:
              '아주 간단한 런닝 게임인 "힘을 찾아런"을 소개합니다. 별다른 생각 없이 시간을 죽이기에 적합한 게임입니다. 플레이 제약을 통한 스트레스 없이 무제한으로 즐길 수 있으며, 골드 역시 스트레스 받지 않을정도로 드립니다. 점프 하나로 모험을 떠나고 보스를 물리치세요!',
            date: '2017-07-01',
            platform: 'Android',
            url:
              'https://play.google.com/store/apps/details?id=com.dopt.rfp1&hl=ko&gl=US',
            image: 'http://localhost:8000/assets/runforpower.png',
          },
          {
            id: 2,
            name: 'DongAutoClicker',
            content:
              '게임을 즐기거나 자동화 테스트를 위해 마우스를 정해진 패턴대로 움직이게 할 수 있는 프로그램입니다.',
            date: '2018-10-14',
            platform: 'Windows',
            url: 'https://m.blog.naver.com/armigar/221377064681',
            image: 'http://localhost:8000/assets/dongautoclicker.png',
          },
        ]

        applications.forEach((item) => {
          const query = `INSERT OR IGNORE INTO tbl_applications (id, name, content, date, platform, url, image) VALUES (${item.id}, '${item.name}', '${item.content}', '${item.date}', '${item.platform}' , '${item.url}', '${item.image}')`
          db.run(query)
        })
      }
    }
  )
}

function fn_notification(db) {
  db.run(
    'CREATE TABLE IF NOT EXISTS tbl_notification (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, expiration DATE, type TEXT)',
    (err) => {
      if (!err) {
        let query = 'DELETE from tbl_notification'
        db.run(query)

        query = `INSERT INTO tbl_notification (content, expiration, type) VALUES ('사이트 공사중입니다. 일부 사용에 제약이 있을 수 있습니다', '2099-12-31', 'warning')`
        db.run(query)
      }
    }
  )
}

function fn_blog(db) {
  //db.run("ALTER TABLE tbl_blog ADD type TEXT DEFAULT 'html'")

  db.run(
    "CREATE TABLE IF NOT EXISTS tbl_blog (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, date DATETIME DEFAULT (datetime('now','localtime')), post TEXT, type TEXT DEFAULT 'html')",
    (err) => {
      if (!err) {
        query = `INSERT INTO tbl_blog (title, post) VALUES ('Sample Blog Test', '<p> This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic typography, images, and code are all supported. </p><hr /><p> Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. </p><blockquote><p> Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. </p></blockquote><p> Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. </p><h2>Heading</h2><p> Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. </p><h3>Sub-heading</h3><p> Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </p><pre><code>Example code block</code></pre><p> Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa. </p><h3>Sub-heading</h3><p> Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. </p><ul><li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li><li>Donec id elit non mi porta gravida at eget metus.</li><li>Nulla vitae elit libero, a pharetra augue.</li></ul><p> Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. </p><ol><li>Vestibulum id ligula porta felis euismod semper.</li><li> Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. </li><li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li></ol><p> Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. </p>')`
        db.run(query)

        query = `INSERT INTO tbl_blog (title, post) VALUES ('꿈에(박정현) 가사', '<p><em>김연지님이 최근에 부르신 꿈에가 너무 좋아 가사를 공유해봅니다.</em></p> <div>어떤말을해야하는지<br />난 너무 가슴이 떨려서<br />우리 옛날 그대로의<br />모습으로 만나고 있네요</div> <div>이건 꿈인걸 알지만<br />지금 이대로 깨지않고서<br />영원히 잠잘수 있다면</div> <div>날 안아주네요<br />예전모습처럼<br />그동안 힘들어진<br />나를 보며 위로하네요<br />내손을 잡네요<br />지친 맘 쉬라며<br />지금도 그대 손은<br />그때처럼 따뜻하네요</div> <div>혹시 이게 꿈이란걸<br />그대가 알게하진 않을거야<br />내가 정말 잘할거야<br />그대 다른 생각 못하도록<br />그대 이젠 가지마요<br />그냥 여기서 나와 있어줘요<br />나도 깨지않을게요<br />이젠 보내지 않을거예요</div> <div>계속 나를 안아주세요<br />예전모습처럼<br />그 동안 힘들어진<br />나를 보며 위로하네요<br />내손을 잡네요<br />지친 맘 이제 쉬라며<br />지금도 그대 손은<br />그때처럼따뜻하네요<br />대답해줘요<br />그대도 나를<br />나만큼 그리워했다고...</div> <div>바보같이 즐거워만하는 날보며<br />안쓰런 미소로 (슬픈 미소로)<br />이제 난 먼저갈게<br />미안한듯 얘기하네요<br />나처럼 그대도 알고있었군요<br />그래도 고마워요<br />이렇게라도 또만나줘서</div>')`
        db.run(query)
      }
    }
  )
}

function fn_accounts(db) {
  //db.run('DROP TABLE IF EXISTS tbl_accounts')

  db.run(
    "CREATE TABLE IF NOT EXISTS tbl_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, date DATETIME DEFAULT (datetime('now', 'localtime')), grade TEXT, token TEXT)",
    (err) => {
      if (!err) {
        query = `INSERT OR IGNORE INTO tbl_accounts (id, email,password, grade, token) VALUES ( (SELECT id FROM tbl_accounts WHERE grade = 'owner'), 'vue', 'vue', 'owner', null)`
        db.run(query)
      }
    }
  )
}

module.exports.run = function (db, type) {
  if (type == TYPE.about_me) {
    fn_about_me(db)
  } else if (type == TYPE.resume) {
    fn_resume(db)
  } else if (type == TYPE.applications) {
    fn_applications(db)
  } else if (type == TYPE.notification) {
    fn_notification(db)
  } else if (type == TYPE.blog) {
    fn_blog(db)
  } else if (type == TYPE.accounts) {
    fn_accounts(db)
  }
}
