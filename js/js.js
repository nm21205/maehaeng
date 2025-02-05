// 다음 주소 검색 API를 사용하여 주소 검색
function openDaumPostcode(type) {
    new daum.Postcode({
      oncomplete: function(data) {
        var fullAddr = data.address; // 최종 주소 변수
        if (type === 'start') {
          document.getElementById('txtStartAddress1').value = fullAddr;
        } else if (type === 'end') {
          document.getElementById('txtEndAddress1').value = fullAddr;
        }
      }
    }).open();
  }
  
  // 거리 측정 기능


  function openDaumMap() {
    // 입력 필드에서 출발지와 도착지 주소를 가져옵니다.
    const startAddress = document.getElementById('txtStartAddress1').value;
    const endAddress = document.getElementById('txtEndAddress1').value;

    // 주소 값이 올바르게 설정되었는지 확인합니다.
    if (!startAddress || !endAddress) {
      alert('출발지와 도착지 주소를 모두 입력하세요.');
      return;
    }

    // 다음 지도 URL을 경로 검색 모드로 설정
    const mapUrl = `https://map.kakao.com/?sName=${encodeURIComponent(startAddress)}&eName=${encodeURIComponent(endAddress)}`;

    // 데스크톱 사용자 에이전트로 새 창을 엽니다.
    const mapWindow = window.open('', '_blank');
    mapWindow.navigator.__defineGetter__('userAgent', function(){
        return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    });

    // 다음 지도 URL을 로드합니다.
    mapWindow.location.href = mapUrl;
  }

  function calculatePrice() {
    var distance = parseFloat(document.getElementById('manualDistance').value);

    if (isNaN(distance) || distance <= 0) {
      alert('유효한 거리를 입력하세요.');
      return;
    }

    // 거리당 가격 계산 (예: 1km당 1000원)
    var pricePerKm = 875;
    var estimatedPrice = distance * pricePerKm;

    // 소수점 올림 처리
    estimatedPrice = Math.ceil(estimatedPrice);

    document.getElementById('estimatedPrice').innerText = estimatedPrice.toLocaleString();
  }

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeBorderColor() {
  const items = document.querySelectorAll('.exp-main li p');
  const randomColor = getRandomColor();
  items.forEach(item => {
    item.style.borderColor = randomColor;
  });
}

function changetextColor() {
  const items = document.querySelectorAll('.exp-last .ex');
  const randomColor = getRandomColor();
  items.forEach(item => {
    item.style.color = randomColor;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // 카카오톡 인앱 브라우저 감지
  if (navigator.userAgent.includes('KAKAOTALK')) {
    alert('이 페이지는 크롬에서 최적화되어 있습니다. 크롬으로 열어주세요.');
  }

  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var targetId = this.getAttribute('data-target');
      var action = this.getAttribute('data-action');

      if (targetId) {
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (action === 'refresh') {
        location.reload(); // 페이지 새로고침
      } else if (action === 'call') {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          // 모바일인 경우
          window.location.href = 'tel:010-7759-0652';
        } else {
          // PC인 경우
          alert('전화번호: 010-7759-0652');
        }
      }
    });
  });

  // phone-number 클릭 이벤트 추가
  document.getElementById('phoneNumber').addEventListener('click', function() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // 모바일인 경우
      window.location.href = 'tel:010-7759-0652';
    } else {
      // PC인 경우
      alert('전화번호: 010-7759-0652');
    }
  });

  // 경계선 색상 변경을 1초마다 실행
  setInterval(changeBorderColor, 1000);
  
  // 텍스트 색상 변경을 1초마다 실행
  setInterval(changetextColor, 1000);
});

document.getElementById('someButton').addEventListener('click', function() {
  const startAddress = document.getElementById('txtStartAddress1').value;
  const endAddress = document.getElementById('txtEndAddress1').value;
  
  console.log('Start Address:', startAddress);
  console.log('End Address:', endAddress);

  openDaumMap(startAddress, endAddress);
});
