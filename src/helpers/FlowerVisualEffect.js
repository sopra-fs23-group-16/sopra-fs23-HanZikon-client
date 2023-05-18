class AnimationItems {
    constructor() {
        this.timer = null;
        this.status = false;
        this.num = 3;// 每秒出现花瓣个数
        this.times = 3; // 每个出现时间
        this.start = function () {
            const body = document.getElementsByTagName('body')[0];
            const keyframes = `@keyframes animation_move {
        0% {
          top: 0;
          opacity: 0.1;
        }
        20% {
          opacity: 1;
          }
        100% {
          top: 100vh;
          }
        }`;
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = keyframes;
            document.getElementsByTagName('head')[0].appendChild(style)
            this.status = false;
            this.timer = setInterval(() => {
                const removeE = document.getElementsByClassName('animation_move');
                const n = this.num * this.times;
                if (removeE.length > n-1) {
                    body.removeChild(removeE[0]);
                }
                const ran = Math.random()*10 * 0.72; //屏幕宽度采用720px，建议使用rem动态计算
                const e = document.createElement('div');
                e.style.width = '50px';
                e.style.height = '50px';
                e.style.background = `url('https://raw.githubusercontent.com/ZGL520/MyImages/master/rose.jpg') no-repeat`;
                e.style.backgroundSize = '50px';
                e.style.position = 'fixed';
                e.style.top = '100px';
                e.style.left = `${ran * 100}px`;
                e.style.animation = `animation_move ${3}s infinite ease-in`;
                e.style.zIndex = 1000;
                e.className = 'animation_move';
                if (!this.status) {
                    body.appendChild(e);
                }
            }, 1000 / this.num);

        };
        this.stop = function () {
            this.status = true;
            clearInterval(this.timer);
            const els = document.getElementsByClassName('animation_move');
            const body = document.getElementsByTagName('body')[0];
            const n = this.num * this.times;
            for (let i = 0; i < n; i++) {
                if (els.length < 1) return;
                body.removeChild(els[0]);
            }
        };
    }
}

export default AnimationItems;