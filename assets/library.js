(function () {
  'use strict';
  var books=window.MYBOOKS_DATA.books, lists=window.MYBOOKS_DATA.lists;
  var labels={unread:'未读',reading:'正在阅读',done:'已读完'};
  var colors={'历史人文':'#8a5b38','投资理财':'#365e4d','文学小说':'#9a4f39','日语学习':'#486b78','机器学习':'#3f5e8a','计算广告':'#71547c','饮食烹饪':'#9d633e'};
  var state={query:'',category:'全部',status:'全部',sort:'featured',view:'grid'}, routeCache={}, toastTimer;
  var statuses=readJson('mybooks-statuses');
  function $(s,p){return (p||document).querySelector(s);}
  function $$(s,p){return Array.from((p||document).querySelectorAll(s));}
  function readJson(k){try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(e){return {};}}
  function esc(v){var n=document.createElement('span');n.textContent=String(v||'');return n.innerHTML;}
  function fileUrl(p){return encodeURI(p.split('\\').join('/'));}
  function coverUrl(id){return 'assets/covers/web/cover-'+String(Number(id.replace('book-',''))).padStart(3,'0')+'.webp';}
  function getStatus(b){return statuses[b.id]||b.initialStatus;}
  function toast(msg){var t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove('show');},2400);}
  function updateStats(){$('#stat-books').textContent=books.length;$('#stat-lists').textContent=lists.length;$('#stat-reading').textContent=books.filter(function(b){return getStatus(b)==='reading';}).length;}
  function cycleStatus(book){var order=['unread','reading','done'],next=order[(order.indexOf(getStatus(book))+1)%3];statuses[book.id]=next;localStorage.setItem('mybooks-statuses',JSON.stringify(statuses));renderBooks();updateStats();toast('《'+book.title+'》已标记为“'+labels[next]+'”');}

  function renderLists(filter){
    filter=filter||'全部';
    $('#booklist-grid').innerHTML=lists.map(function(list,index){
      var hidden=filter!=='全部'&&list.category!==filter;
      return '<article class="list-card" data-list-id="'+list.id+'" '+(hidden?'hidden':'')+'><div class="list-card-top"><span class="list-kind">'+String(index+1).padStart(2,'0')+' · '+esc(list.category)+(list.category==='奖项'?'精选':'书单')+'</span><span class="list-count"><strong>'+list.count+'</strong> 本</span></div><h3>'+esc(list.title)+'</h3><p>'+esc(list.intro)+'</p><div class="list-card-footer"><span>查看完整路线</span><button type="button" data-open-route="'+list.id+'" aria-label="打开书单">↗</button></div></article>';
    }).join('');
  }

  function bookCard(book){
    var status=getStatus(book),first=Array.from(book.title.replace(/[《（(\s]/g,''))[0]||'书';
    return '<article class="book-card" data-book-id="'+book.id+'" style="--category-color:'+(colors[book.category]||'#365e4d')+'"><div class="book-card-top"><span class="book-category">'+esc(book.category)+'</span><span class="format-badge">'+book.format+'</span></div><div class="book-cover-wrap"><img class="book-cover-image" src="'+coverUrl(book.id)+'" alt="《'+esc(book.title)+'》原创封面" loading="lazy" decoding="async"><div class="book-monogram" aria-hidden="true">'+esc(first)+'</div></div><div class="book-main"><h3>'+esc(book.title)+'</h3><p class="book-byline">'+esc(book.author)+'</p></div><p class="book-summary">'+esc(book.summary)+'</p><div class="book-card-bottom"><button class="status-button" type="button" data-cycle-status="'+book.id+'" data-status="'+status+'" title="点击切换阅读状态"><span class="status-dot"></span>'+labels[status]+'</button><div class="book-actions"><button type="button" data-open-book="'+book.id+'" title="查看简介">＋</button><a href="'+fileUrl(book.path)+'" target="_blank" title="打开文件">↗</a></div></div></article>';
  }

  function filteredBooks(){
    var q=state.query.trim().toLocaleLowerCase('zh-CN');
    var result=books.filter(function(b){var text=(b.title+' '+b.author+' '+b.category+' '+b.summary+' '+b.format).toLocaleLowerCase('zh-CN');return(!q||text.indexOf(q)>=0)&&(state.category==='全部'||b.category===state.category)&&(state.status==='全部'||getStatus(b)===state.status);});
    if(state.sort==='title')result.sort(function(a,b){return a.title.localeCompare(b.title,'zh-CN');});
    if(state.sort==='category')result.sort(function(a,b){return a.category.localeCompare(b.category,'zh-CN')||a.title.localeCompare(b.title,'zh-CN');});
    if(state.sort==='status')result.sort(function(a,b){var o=['reading','unread','done'];return o.indexOf(getStatus(a))-o.indexOf(getStatus(b));});
    return result;
  }
  function renderChips(){var c=[];if(state.query)c.push(['query','检索：'+state.query]);if(state.category!=='全部')c.push(['category',state.category]);if(state.status!=='全部')c.push(['status',labels[state.status]]);$('#active-filters').innerHTML=c.map(function(x){return '<span class="filter-chip">'+esc(x[1])+'<button type="button" data-clear-filter="'+x[0]+'">×</button></span>';}).join('');}
  function renderBooks(){var result=filteredBooks(),grid=$('#book-grid');grid.classList.toggle('row-view',state.view==='row');grid.innerHTML=result.map(bookCard).join('');$$('.book-cover-image',grid).forEach(function(img){img.addEventListener('error',function(){img.classList.add('failed');},{once:true});});$('#result-count').textContent=result.length;$('#empty-state').hidden=result.length>0;grid.hidden=result.length===0;$('#collection-search').value=state.query;$('.collection-search').classList.toggle('has-value',Boolean(state.query));renderChips();}
  function search(q,scroll){state.query=q.trim();renderBooks();if(scroll)$('#collection').scrollIntoView({behavior:'smooth',block:'start'});}
  function resetFilters(){state.query='';state.category='全部';state.status='全部';state.sort='featured';$('#category-filter').value='全部';$('#status-filter').value='全部';$('#sort-books').value='featured';$('#hero-search').value='';renderBooks();}

  function openBook(book){
    if(!book)return;var status=getStatus(book);
    $('#book-dialog-content').innerHTML='<div class="detail-layout" style="--category-color:'+(colors[book.category]||'#365e4d')+'"><div class="detail-cover"><img src="'+coverUrl(book.id)+'" alt="原创封面"><span>'+esc(book.category)+' · '+book.format+'</span><strong>'+esc(Array.from(book.title)[0])+'</strong></div><div class="detail-copy"><p class="section-index">BOOK DETAIL / '+String(books.indexOf(book)+1).padStart(3,'0')+'</p><h2>'+esc(book.title)+'</h2><p class="detail-byline">'+esc(book.author)+'</p><p class="detail-summary">'+esc(book.summary)+'</p><div class="detail-meta"><div><small>分类</small><strong>'+esc(book.category)+'</strong></div><div><small>格式</small><strong>'+book.format+'</strong></div><div><small>状态</small><strong>'+labels[status]+'</strong></div></div><div class="detail-actions"><a href="'+fileUrl(book.path)+'" target="_blank">打开图书 ↗</a><button type="button" data-dialog-status="'+book.id+'">切换阅读状态</button></div></div></div>';
    $('#book-dialog').showModal();
  }

  function cleanMarkdown(text){return text.replace(/\*\*/g,'').replace(/[*_]/g,'').replace(/\[([^\]]+)\]\([^\)]+\)/g,'$1').trim();}
  function parseRoute(markdown){
    var lines=markdown.split(/\r?\n/),stages=[],stage={title:'精选书目',items:[]};
    var intro=lines.slice(1).find(function(line){return line.trim()&&!line.startsWith('#')&&!line.startsWith('状态');})||'';
    lines.forEach(function(line){
      if(line.startsWith('## ')){if(stage.items.length)stages.push(stage);stage={title:cleanMarkdown(line.slice(3)),items:[]};}
      else if(/^- \[[ xX]\]/.test(line)&&line.indexOf('示例作品')<0){
        var done=/^- \[[xX]\]/.test(line),content=cleanMarkdown(line.replace(/^- \[[ xX]\]\s*/,''));
        var marks=['📚 已入库','💾 本地馆藏','🟡 在读','✅ 已读'].filter(function(mark){return content.indexOf(mark)>=0;});
        var label=content.replace(/　?(📚 已入库|💾 本地馆藏|🟡 在读|✅ 已读)/g,'').trim();stage.items.push({done:done,label:label,marks:marks.join(' · ')});
      }
    });
    if(stage.items.length)stages.push(stage);return{intro:cleanMarkdown(intro),stages:stages};
  }
  function showRoute(list,parsed){
    $('#route-dialog-intro').textContent=parsed.intro||list.intro;
    $('#route-body').innerHTML=parsed.stages.map(function(stage,index){return '<section class="route-stage"><h3><span>'+String(index+1).padStart(2,'0')+'</span>'+esc(stage.title)+'</h3>'+stage.items.map(function(item){return '<div class="route-item '+(item.done?'done':'')+'"><span>'+esc(item.label)+'</span>'+(item.marks?'<span class="library-mark">'+esc(item.marks)+'</span>':'')+'</div>';}).join('')+'</section>';}).join('');
  }
  async function openRoute(list){
    if(!list)return;$('#route-dialog-category').textContent=list.category+'书单 · '+list.count+' 本';$('#route-dialog-title').textContent=list.title;$('#route-dialog-intro').textContent=list.intro;$('#route-source').href=fileUrl(list.path);$('#route-body').innerHTML='<p class="route-loading">正在整理阅读路线……</p>';$('#route-dialog').showModal();
    try{if(!routeCache[list.id]){var response=await fetch(fileUrl(list.path));if(!response.ok)throw new Error('无法读取路线');routeCache[list.id]=parseRoute(await response.text());}showRoute(list,routeCache[list.id]);}
    catch(error){$('#route-body').innerHTML='<div class="empty-state"><h3>本地预览无法加载路线</h3><p>通过本地服务器或 GitHub Pages 访问时可直接预览，也可以打开 Markdown 原文。</p></div>';}
  }
  function initTheme(){var saved=localStorage.getItem('mybooks-theme');document.documentElement.dataset.theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');$('#theme-toggle').addEventListener('click',function(){var next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('mybooks-theme',next);});}
  function handleClick(event){
    var statusButton=event.target.closest('[data-cycle-status], [data-dialog-status]');if(statusButton){var id=statusButton.dataset.cycleStatus||statusButton.dataset.dialogStatus,book=books.find(function(x){return x.id===id;});cycleStatus(book);if(statusButton.dataset.dialogStatus){$('#book-dialog').close();openBook(book);}return;}
    var bookButton=event.target.closest('[data-open-book]');if(bookButton){openBook(books.find(function(x){return x.id===bookButton.dataset.openBook;}));return;}
    var routeButton=event.target.closest('[data-open-route]');if(routeButton){openRoute(lists.find(function(x){return x.id===routeButton.dataset.openRoute;}));return;}
    var card=event.target.closest('.list-card');if(card&&!event.target.closest('a,button')){openRoute(lists.find(function(x){return x.id===card.dataset.listId;}));return;}
    var chip=event.target.closest('[data-clear-filter]');if(chip){if(chip.dataset.clearFilter==='query'){state.query='';$('#hero-search').value='';}if(chip.dataset.clearFilter==='category'){state.category='全部';$('#category-filter').value='全部';}if(chip.dataset.clearFilter==='status'){state.status='全部';$('#status-filter').value='全部';}renderBooks();}
  }
  function init(){
    initTheme();updateStats();renderLists();Array.from(new Set(books.map(function(b){return b.category;}))).forEach(function(c){$('#category-filter').add(new Option(c,c));});renderBooks();$('#year').textContent=new Date().getFullYear();
    $('#hero-search-form').addEventListener('submit',function(e){e.preventDefault();search($('#hero-search').value,true);});$('#collection-search').addEventListener('input',function(e){search(e.target.value);});$('#clear-search').addEventListener('click',function(){search('');});
    $('#category-filter').addEventListener('change',function(e){state.category=e.target.value;renderBooks();});$('#status-filter').addEventListener('change',function(e){state.status=e.target.value;renderBooks();});$('#sort-books').addEventListener('change',function(e){state.sort=e.target.value;renderBooks();});$('#reset-filters').addEventListener('click',resetFilters);
    $('#grid-view').addEventListener('click',function(){state.view='grid';$('#grid-view').classList.add('active');$('#row-view').classList.remove('active');renderBooks();});$('#row-view').addEventListener('click',function(){state.view='row';$('#row-view').classList.add('active');$('#grid-view').classList.remove('active');renderBooks();});
    $('#list-filter').addEventListener('click',function(e){var b=e.target.closest('[data-list-category]');if(!b)return;$$('#list-filter button').forEach(function(x){x.classList.toggle('active',x===b);});renderLists(b.dataset.listCategory);});document.addEventListener('click',handleClick);
    $('[data-featured-book]').addEventListener('click',function(e){openBook(books.find(function(b){return b.title.indexOf(e.currentTarget.dataset.featuredBook)>=0;}));});$$('[data-close-dialog]').forEach(function(b){b.addEventListener('click',function(){b.closest('dialog').close();});});$$('dialog').forEach(function(d){d.addEventListener('click',function(e){if(e.target===d)d.close();});});
    document.addEventListener('keydown',function(e){if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#collection-search').focus();$('#collection').scrollIntoView({behavior:'smooth'});}});
  }
  document.addEventListener('DOMContentLoaded',init);
}());
