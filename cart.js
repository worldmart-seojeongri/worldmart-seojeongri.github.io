/* Seojeongri shopping list. No personal details are stored or sent automatically. */
(() => {
  'use strict';
  const KEY = 'wm_seojeongri_cart_v1';
  const products = new Map();
  CATEGORIES.forEach(c => c.items.forEach(it => {
    // Names remain stable when catalog entries are inserted or reordered.
    it.cartId = JSON.stringify([c.id, it.name, it.zh || '']);
    products.set(it.cartId, it);
  }));
  const messages = {
    ko:['장바구니','담기','품절','개','아직 담은 상품이 없어요.','상품을 둘러보고 ＋ 버튼으로 담아 주세요.','옵션 선택','장바구니에 담았습니다','삭제','줄이기','늘리기','재고와 최종 금액은 매장에서 확인합니다. 이 목록은 기기에 저장되며 주문이 자동 접수되지 않습니다.','주문자 이름 (선택)','연락처 (선택)','방문 예정 시간 (선택)','요청 사항 (선택)','주문 내용 복사','카카오톡 열기','위챗 열기','주문 내용','복사했습니다. 카톡·위챗에 붙여넣고 직접 보내 주세요.','복사하지 못했습니다. 아래 주문 내용을 길게 눌러 복사해 주세요.','메시지를 직접 보내고 매장 확인을 받아야 주문이 확정됩니다. 결제는 매장과 별도로 안내받아 주세요.','상품·수량 확인 → 내용 복사 → 카톡·위챗으로 전송','닫기','가격은 매장 문의','계속 쇼핑하기','수량은 최대 99개입니다.','저장 공간을 사용할 수 없어 이 창에서만 장바구니가 유지됩니다.','매장 방문용 구매 목록으로도 사용할 수 있습니다.','총 수량'],
    zh:['购物车','加入','缺货','件','购物车为空','浏览商品后点击 ＋ 添加。','选择口味','已加入购物车','删除','减少','增加','库存和最终价格请向门店确认。清单保存在本机，不会自动提交订单。','姓名（选填）','联系方式（选填）','到店时间（选填）','备注（选填）','复制订单','打开 KakaoTalk','打开微信','订单内容','已复制，请粘贴到聊天中并发送。','复制失败，请长按下方订单内容复制。','请亲自发送消息，经门店确认后订单才成立。付款方式请联系门店。','确认商品数量 → 复制 → 发送到聊天','关闭','价格请咨询门店','继续购物','数量最多99件。','无法保存到本机，清单仅在当前页面保留。','也可作为到店购物清单。','总数量'],
    en:['Shopping cart','Add','Sold out','items','Your cart is empty.','Tap ＋ on a product to add it.','Choose an option','Added to cart','Remove','Decrease','Increase','Stock and final prices must be confirmed by the store. This list is saved on your device; no order is submitted automatically.','Name (optional)','Contact (optional)','Pickup time (optional)','Notes (optional)','Copy order','Open KakaoTalk','Open WeChat','Order details','Copied. Paste into your chat and send it.','Copy failed. Select and copy the order text below.','Send the message yourself. Your order is confirmed only after the store replies. Arrange payment with the store.','Check items → copy → send in chat','Close','Ask store for price','Continue shopping','Maximum quantity is 99.','Device storage is unavailable. Your cart will last only while this page stays open.','You can also use this as an in-store shopping list.','Total items'],
    vi:['Giỏ hàng','Thêm','Hết hàng','sản phẩm','Giỏ hàng trống.','Nhấn ＋ để thêm sản phẩm.','Chọn loại','Đã thêm vào giỏ','Xóa','Giảm','Tăng','Cửa hàng sẽ xác nhận hàng và giá cuối cùng. Danh sách lưu trên thiết bị, chưa tự gửi đơn.','Tên (tùy chọn)','Liên hệ (tùy chọn)','Giờ đến lấy (tùy chọn)','Ghi chú (tùy chọn)','Sao chép đơn','Mở KakaoTalk','Mở WeChat','Nội dung đơn','Đã sao chép. Dán vào tin nhắn và tự gửi.','Không sao chép được. Hãy chọn nội dung bên dưới.','Vui lòng tự gửi tin nhắn. Đơn chỉ được xác nhận khi cửa hàng trả lời. Thanh toán theo hướng dẫn của cửa hàng.','Kiểm tra → sao chép → gửi tin nhắn','Đóng','Hỏi giá tại cửa hàng','Tiếp tục mua sắm','Tối đa 99 sản phẩm.','Không lưu được trên thiết bị; giỏ chỉ giữ khi trang còn mở.','Có thể dùng làm danh sách mua tại cửa hàng.','Tổng số lượng'],
    th:['ตะกร้าสินค้า','เพิ่ม','สินค้าหมด','ชิ้น','ยังไม่มีสินค้า','กด ＋ เพื่อเพิ่มสินค้า','เลือกตัวเลือก','เพิ่มแล้ว','ลบ','ลด','เพิ่ม','ร้านค้าจะยืนยันสต็อกและราคา รายการบันทึกในอุปกรณ์และยังไม่ส่งคำสั่งซื้ออัตโนมัติ','ชื่อ (ไม่บังคับ)','ช่องทางติดต่อ (ไม่บังคับ)','เวลารับสินค้า (ไม่บังคับ)','หมายเหตุ (ไม่บังคับ)','คัดลอกคำสั่งซื้อ','เปิด KakaoTalk','เปิด WeChat','รายการสั่งซื้อ','คัดลอกแล้ว กรุณาวางในแชตและส่งเอง','คัดลอกไม่สำเร็จ กรุณาเลือกข้อความด้านล่าง','กรุณาส่งข้อความเอง คำสั่งซื้อยืนยันเมื่อร้านค้าตอบกลับ กรุณาสอบถามวิธีชำระเงินกับร้านค้า','ตรวจสอบ → คัดลอก → ส่งในแชต','ปิด','สอบถามราคาที่ร้าน','เลือกสินค้าต่อ','สูงสุด 99 ชิ้น','ไม่สามารถบันทึกได้ ตะกร้าจะอยู่จนกว่าจะปิดหน้านี้','ใช้เป็นรายการซื้อของที่ร้านได้','จำนวนรวม']
  };
  // Remaining catalog languages use clear English cart controls.
  const t = i => (messages[L] || messages.en)[i];
  const deliveryNotice='5만 원 이상 주문 시 매장 반경 5km 이내 무료배달합니다.';
  const deliveryTranslations={zh:'订单满50,000韩元，门店半径5公里以内免费配送。',en:'Free delivery on orders of ₩50,000 or more within a 5 km radius of the store.',vi:'Miễn phí giao hàng cho đơn từ 50.000 won trong bán kính 5 km từ cửa hàng.',th:'ส่งฟรีเมื่อสั่งซื้อ 50,000 วอนขึ้นไป ภายในรัศมี 5 กม. จากร้าน',id:'Gratis antar untuk pesanan minimal ₩50.000 dalam radius 5 km dari toko.',km:'ដឹកជញ្ជូនឥតគិតថ្លៃសម្រាប់ការបញ្ជាទិញចាប់ពី 50,000 វ៉ុនឡើងទៅ ក្នុងរង្វង់ 5 គីឡូម៉ែត្រពីហាង។',my:'ဝမ် ၅၀,၀၀၀ နှင့်အထက် မှာယူပါက ဆိုင်မှ ၅ ကီလိုမီတာ ပတ်လည်အတွင်း အခမဲ့ပို့ဆောင်ပေးပါသည်။'};
  for(const [lang,text] of Object.entries(deliveryTranslations)) if(DICT[lang]) DICT[lang][deliveryNotice]=text;
  EN[deliveryNotice]=deliveryTranslations.en;
  const sold = it => /품절|缺货/.test(it.badge || '');
  const options = it => (it.opts && it.opts.length ? it.opts : (it.gallery || []).filter(f=>!f.big).map(f=>f.k)).filter(Boolean);
  let rows = [];
  let storageWarning = false;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(saved)) saved.slice(0,300).forEach(r=>{
      const it = r && products.get(r.id);
      if (!it || sold(it) || !Number.isInteger(r.qty) || r.qty<1 || r.qty>99) return;
      const opts=options(it);
      if (typeof r.option!=='string' || (opts.length ? !opts.includes(r.option) : r.option!=='')) return;
      const old=rows.find(a=>a.id===r.id && a.option===r.option);
      if(old) old.qty=Math.min(99,old.qty+r.qty); else rows.push({id:r.id,option:r.option,qty:r.qty});
    });
  } catch (_) {}
  const count = () => rows.reduce((sum,r)=>sum+r.qty,0);
  const dock=document.createElement('button');
  dock.type='button'; dock.className='cart-dock'; document.body.append(dock);
  const dialog=document.createElement('dialog');dialog.className='cart-dialog';dialog.setAttribute('aria-labelledby','cart-title');document.body.append(dialog);
  const picker=document.createElement('dialog');picker.className='cart-dialog';picker.setAttribute('aria-labelledby','cart-option-title');document.body.append(picker);
  let details={name:'',contact:'',pickup:'',note:''};
  function save(){
    try{localStorage.setItem(KEY,JSON.stringify(rows));}catch(_){if(!storageWarning){toast(t(28));storageWarning=true;}}
    refreshDock();refreshQuantities();
  }
  function refreshDock(){dock.innerHTML=`<span>🛒 ${esc(t(0))} <b>${count()}</b></span><small>${esc(t(19))} ›</small>`;}
  const quantity=(id,option)=>rows.filter(r=>r.id===id&&(option===undefined||r.option===option)).reduce((sum,r)=>sum+r.qty,0);
  function refreshQuantities(){
    document.querySelectorAll('[data-cart-controls]').forEach(el=>{
      const id=el.dataset.cartControls,n=quantity(id);
      el.querySelector('output').textContent=n;
      el.querySelector('output').hidden=!n;
      el.querySelector('[data-cart-action="minus"]').hidden=!n;
      el.setAttribute('aria-label',nm(products.get(id))+' · '+n);
    });
    picker.querySelectorAll('[data-option-row]').forEach(el=>{
      const id=picker.dataset.product,option=options(products.get(id))[+el.dataset.optionRow],n=quantity(id,option);
      el.querySelector('output').textContent=n;
      el.querySelector('[data-option-minus]').disabled=!n;
      el.querySelector('[data-option-add]').disabled=n>=99||/품절|缺货/.test(option);
    });
  }
  function decrease(id,option){
    const i=rows.findIndex(r=>r.id===id&&r.option===option);if(i<0)return;
    if(--rows[i].qty===0)rows.splice(i,1);save();
  }
  function add(id,option){
    const it=products.get(id);if(!it||sold(it))return;
    const old=rows.find(r=>r.id===id&&r.option===option);
    if(old&&old.qty>=99){toast(t(27));return;}
    if(old)old.qty++;else rows.push({id,option,qty:1});save();toast(t(7));
  }
  function choose(id){
    const it=products.get(id);if(!it||sold(it))return;
    const opts=options(it);if(!opts.length){add(id,'');return;}
    picker.dataset.product=id;
    picker.innerHTML=`<div class="cart-head"><h2 id="cart-option-title">${esc(t(6))}</h2><button type="button" class="cart-close" aria-label="${esc(t(24))}">×</button></div><div class="cart-body"><strong>${esc(nm(it))}</strong>${opts.map((o,i)=>`<div class="cart-option-row" data-option-row="${i}"><span>${esc(tr(o))}</span><div class="cart-step"><button type="button" data-option-minus="${i}" aria-label="${esc(t(9)+' · '+tr(o))}">−</button><output aria-live="polite">${quantity(id,o)}</output><button type="button" data-option-add="${i}" aria-label="${esc(t(1)+' · '+tr(o))}">＋</button></div></div>`).join('')}</div>`;
    picker.querySelector('.cart-close').onclick=()=>picker.close();
    picker.querySelectorAll('[data-option-add]').forEach(b=>b.onclick=()=>add(id,opts[+b.dataset.optionAdd]));
    picker.querySelectorAll('[data-option-minus]').forEach(b=>b.onclick=()=>decrease(id,opts[+b.dataset.optionMinus]));
    refreshQuantities();picker.showModal();
  }
  // Capture add-button events before the existing photo-gallery handlers.
  document.getElementById('list').addEventListener('click',e=>{
    const b=e.target.closest('[data-cart-action]');if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    const id=b.closest('[data-cart-controls]').dataset.cartControls;
    if(b.dataset.cartAction==='minus'&&!options(products.get(id)).length)decrease(id,'');else choose(id);
  },true);
  document.getElementById('list').addEventListener('keydown',e=>{if(e.target.closest('[data-cart-controls]'))e.stopImmediatePropagation();},true);
  const baseCard=card;
  card=function(it){
    const html=baseCard(it);
    return html.replace(/<div class="item[^>]*>/,m=>m.replace(' role="button"',' role="group"'))
      .replace(/\s*<\/div>\s*$/,sold(it)?`<button type="button" class="cart-add" disabled>${esc(t(2))}</button></div>`:`<div class="cart-inline" data-cart-controls="${esc(it.cartId)}" role="group" aria-label="${esc(nm(it)+' · '+quantity(it.cartId))}"><button type="button" data-cart-action="minus" aria-label="${esc(t(9)+' · '+nm(it))}" ${quantity(it.cartId)?'':'hidden'}>−</button><output aria-live="polite" ${quantity(it.cartId)?'':'hidden'}>${quantity(it.cartId)}</output><button type="button" data-cart-action="plus" aria-label="${esc(t(1)+' · '+nm(it))}">＋</button></div></div>`);
  };
  function orderText(){
    return ['서정리 월드마트 주문 문의 / Order request', ...rows.map((r,i)=>{
      const it=products.get(r.id);return `${i+1}. ${it.name}${it.zh?' / '+it.zh:''}${r.option?' ['+r.option+']':''} × ${r.qty}`;
    }),`총 수량 / Total: ${count()}`, ...[['이름 / Name',details.name],['연락처 / Contact',details.contact],['방문 시간 / Pickup',details.pickup],['요청 / Note',details.note]].filter(a=>a[1].trim()).map(a=>a.join(': ')), '재고·금액 확인 후 답변 부탁드립니다. / Please confirm stock and final price.'].join('\n');
  }
  function renderCart(){
    dialog.innerHTML=`<div class="cart-head"><h2 id="cart-title">${esc(t(0))} · ${count()}</h2><button type="button" class="cart-close" aria-label="${esc(t(24))}">×</button></div><div class="cart-body">${!rows.length?`<div class="cart-empty"><h3>${esc(t(4))}</h3><p>${esc(t(5))}</p></div><button type="button" class="cart-primary cart-continue">${esc(t(26))}</button>`:`<p class="cart-note">${esc(t(11))} ${esc(t(29))}</p><div>${rows.map((r,i)=>{const it=products.get(r.id);return `<div class="cart-row"><div class="cart-product"><strong>${esc(nm(it))}</strong>${r.option?`<small>${esc(tr(r.option))}</small>`:''}<small>${it.price!=null?esc(won(it.price)):esc(t(25))}</small><button type="button" class="cart-remove" data-remove="${i}">${esc(t(8))}</button></div><div class="cart-step"><button type="button" data-change="${i}" data-delta="-1" aria-label="${esc(t(9)+' · '+nm(it))}">−</button><output>${r.qty}</output><button type="button" data-change="${i}" data-delta="1" aria-label="${esc(t(10)+' · '+nm(it))}" ${r.qty>=99?'disabled':''}>＋</button></div></div>`;}).join('')}</div><div class="cart-fields">${['name','contact','pickup','note'].map((key,i)=>`<label>${esc(t(12+i))}${key==='note'?`<textarea data-detail="${key}" maxlength="500">${esc(details[key])}</textarea>`:`<input data-detail="${key}" maxlength="100" value="${esc(details[key])}" autocomplete="${key==='name'?'name':key==='contact'?'tel':'off'}">`}</label>`).join('')}</div><p class="cart-note">${esc(t(23))}</p><div class="cart-actions"><button type="button" class="cart-primary" id="cart-copy">${esc(t(16))}</button><div class="cart-contacts"><a class="cart-contact" href="http://qr.kakao.com/talk/t.j5JlP1H2JkyEz7FNMvcXEVQ4c-" target="_blank" rel="noopener">${esc(t(17))}</a><button type="button" class="cart-contact" id="cart-wechat">${esc(t(18))}</button></div><p class="cart-note">KakaoTalk: cuitiemei1220 · WeChat: cjfao1220<br>${esc(t(22))}</p><label for="cart-preview">${esc(t(19))}</label><textarea id="cart-preview" class="cart-preview" readonly></textarea><p role="status" id="cart-copy-status" class="cart-note"></p></div>`}</div>`;
    dialog.querySelector('.cart-close').onclick=()=>dialog.close();
    dialog.querySelector('.cart-continue')?.addEventListener('click',()=>dialog.close());
    dialog.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{rows.splice(+b.dataset.remove,1);save();renderCart();});
    dialog.querySelectorAll('[data-change]').forEach(b=>b.onclick=()=>{
      const i=+b.dataset.change;rows[i].qty+=+b.dataset.delta;if(rows[i].qty<=0)rows.splice(i,1);save();renderCart();
      const next=dialog.querySelector(`[data-change="${i}"][data-delta="${b.dataset.delta}"]`);(next||dialog.querySelector('.cart-close')).focus();
    });
    const preview=dialog.querySelector('#cart-preview');if(preview)preview.value=orderText();
    dialog.querySelectorAll('[data-detail]').forEach(el=>el.oninput=()=>{details[el.dataset.detail]=el.value;preview.value=orderText();});
    dialog.querySelector('#cart-copy')?.addEventListener('click',async()=>{
      let ok=false;try{await navigator.clipboard.writeText(orderText());ok=true;}catch(_){preview.focus();preview.select();ok=document.execCommand('copy');}
      dialog.querySelector('#cart-copy-status').textContent=t(ok?20:21);
    });
    dialog.querySelector('#cart-wechat')?.addEventListener('click',()=>{const a=document.getElementById('openWc');if(a)a.click();});
  }
  // Native dialogs keep keyboard focus inside and restore it on close.
  dock.onclick=()=>{renderCart();dialog.showModal();};
  const originalLang=setLang;
  setLang=function(l){originalLang(l);refreshDock();};
  applyStatic();refreshDock();render();
})();
