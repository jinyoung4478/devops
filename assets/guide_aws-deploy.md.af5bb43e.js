import{_ as s,c as a,a as n,d as l,w as p,e,b as o,r as t,o as c}from"./app.10725d7d.js";const r=JSON.parse('{"title":"AWS 배포","description":"","frontmatter":{"head":[["meta",{"property":"og:description","content":"AWS 배포 하기"}],["meta",{"property":"twitter:description","content":"AWS 배포 하기"}]]},"headers":[{"level":2,"title":"Beanstalk 업데이트","slug":"beanstalk-업데이트"},{"level":2,"title":"IAM 만들기","slug":"iam-만들기"},{"level":2,"title":"EC2 만들기","slug":"ec2-만들기"},{"level":2,"title":"GitHub Deploy Key 설정","slug":"github-deploy-key-설정"},{"level":2,"title":"Node.js 배포","slug":"node-js-배포"},{"level":2,"title":"PM2","slug":"pm2"},{"level":2,"title":"마무리","slug":"마무리"}],"relativePath":"guide/aws-deploy.md"}'),i={name:"guide/aws-deploy.md"},y=e('<h1 id="aws-배포" tabindex="-1">AWS 배포 <a class="header-anchor" href="#aws-배포" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">⚡️ 목표</p><p>✅ IAM, EC2에 대해 알아봅니다.<br> ✅ GitHub Deploy Key를 생성합니다.<br> ✅ Node.js를 설치하고 웹 애플리케이션 배포 환경을 구축합니다.<br> ✅ <a href="https://pm2.keymetrics.io/" target="_blank" rel="noopener noreferrer">PM2</a>를 이용하여 무중단으로 배포합니다.</p></div><nav class="table-of-contents"></nav><p><code>/activity</code> API에 <code>participants</code> 항목을 추가해달라는 요구사항을 받았습니다. 간단하게 소스를 수정하고 새로운 버전을 배포합니다.</p><div class="language-js"><span class="copy"></span><div class="highlight-lines"><br><br><br><br><br><div class="highlighted"> </div><br><br><br><br><br><br><br><br><br><br><br></div><pre><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/activity</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">_</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> reply</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">response</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">fetch</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://www.boredapi.com/api/activity</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">json</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">activity</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> activity</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">activity</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> participants</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">participants</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// ⇠ 수정</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">reply</span></span>\n<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">code</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">400</span><span style="color:#F07178;">)</span></span>\n<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> code</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">API_ERROR</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Activity is required!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">catch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">e</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">reply</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">code</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">400</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> code</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">API_ERROR</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> message</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">message</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"><span style="color:#89DDFF;">...</span></span>\n<span class="line"></span></code></pre></div><h2 id="beanstalk-업데이트" tabindex="-1">Beanstalk 업데이트 <a class="header-anchor" href="#beanstalk-업데이트" aria-hidden="true">#</a></h2><p>기존에 만들었던 환경을 선택하고 새로운 버전을 배포합니다.</p><ol><li><code>Upload and deploy</code> 버튼을 누르고</li></ol>',8),D={class:"image-750"},F=n("ol",{start:"2"},[n("li",null,"최신 소스 파일을 업로드 합니다. 그럼 자동으로 업데이트를 진행합니다.")],-1),A={class:"image-550"},C=e('<div class="tip custom-block"><p class="custom-block-title">AWS Elastic Beanstalk 더보기</p><p>📔 <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html" target="_blank" rel="noopener noreferrer">Beanstalk 배포 옵션</a></p></div><h2 id="iam-만들기" tabindex="-1">IAM 만들기 <a class="header-anchor" href="#iam-만들기" aria-hidden="true">#</a></h2><p>가상머신을 만들기 전에 AWS 권한으로 서버에 접근할 수 있도록 AWS Systems Manager(SSM) EC2 Role을 생성합니다. 보통 서버에 접근할 땐 개인키<sup>Private Key</sup>나 아이디, 패스워드를 사용하는데 여러 가지 이유로 <a href="https://aws.amazon.com/blogs/infrastructure-and-automation/toward-a-bastion-less-world/" target="_blank" rel="noopener noreferrer">AWS Systems Manager(SSM) 방식을 권장</a>합니다. 더 안전하고, 더 편리한 방법이라고 보면 될 것 같습니다.</p><p>IAM &gt; Roles 메뉴에서 새로운 Role을 추가합니다.</p><ol><li>EC2 권한을 선택합니다.</li></ol>',5),_={class:"image-600"},d=n("ol",{start:"2"},[n("li",null,"AWS에서 미리 만들어 놓은 AmazonSSMManagedInstanceCore Policy를 선택합니다.")],-1),u={class:"image-650"},m=n("ol",{start:"3"},[n("li",null,"마지막으로 이름을 입력하고 Role을 생성합니다.")],-1),g={class:"image-550"},h=e('<div class="tip custom-block"><p class="custom-block-title">AWS System Manager 더보기</p><p>📔 <a href="https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/introduction.html" target="_blank" rel="noopener noreferrer">IAM(AWS Identity and Access Management) 공식문서</a><br> 📔 <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html" target="_blank" rel="noopener noreferrer">AWS System Manager 공식문서</a><br> 📝 <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started-enable-ssh-connections.html" target="_blank" rel="noopener noreferrer">Session Manager로 SSH 접속하기</a></p></div><h2 id="ec2-만들기" tabindex="-1">EC2 만들기 <a class="header-anchor" href="#ec2-만들기" aria-hidden="true">#</a></h2><p>IAM Role을 만들었으니, EC2 메뉴에서 새로운 인스턴스<sup>Instance</sup>를 생성합니다.</p><div class="tip custom-block"><p class="custom-block-title">🙋 EC2 설정은 왜 이렇게 복잡한가요</p><p>EC2는 2006년 처음 출시되었는데, 한 종류였던 <a href="https://aws.amazon.com/ko/ec2/instance-types/" target="_blank" rel="noopener noreferrer">인스턴스 유형</a>이 지금은 400개가 넘고 계속해서 새로운 기능이 추가되면서 생성 화면이 엄청나게 복잡해졌습니다. 단순한 가상 머신 하나를 생성하더라도 설정할 게 많습니다.<br> 더욱 단순하게 사용할 수 있는 <a href="https://aws.amazon.com/free/compute/lightsail/" target="_blank" rel="noopener noreferrer">Lightsail</a>이란 서비스도 있습니다.</p></div><p>EC2 생성 옵션이 많은데 일단 무시하고 핵심적인 부분을 살펴봅니다.</p><p><strong>Amazon machine image (AMI)</strong> <code>Amazon Linux 2 AMI (HVM) - Kernel 5.10 / 64-bit (x86)</code></p><ul><li>OS(Windows, macOS, Linux, ...)와 CPU 아키텍처(x86, arm)를 선택합니다. 여기선 EC2에 최적화된 리눅스 배포판을 선택합니다.</li></ul>',7),f={class:"image-650"},v=n("p",null,[n("strong",null,"Instance type"),o(),n("code",null,"t2.micro (1 vCPU / 1 GiB Memory)")],-1),b=n("ul",null,[n("li",null,"CPU와 메모리 성능을 선택합니다.")],-1),E={class:"image-650"},M=n("p",null,[n("strong",null,"Key pair"),o(),n("code",null,"사용하지 않음")],-1),S=n("ul",null,[n("li",null,"서버 콘솔 접근 시 사용할 공개키를 선택합니다. 여기선 AWS Systems Manager를 이용한 Session Manager 방식으로 접근할 거라 사용하지 않습니다.")],-1),k={class:"image-650"},w=n("p",null,[n("strong",null,"Subnet"),o(),n("code",null,"Public 영역 선택")],-1),P=n("ul",null,[n("li",null,"네트워크 서브넷을 선택합니다. 퍼블릭 서브넷과 프라이빗 서브넷이 있는데 퍼블릭 서브넷은 인터넷에 노출되어 있고, 프라이빗 서브넷은 내부망에서만 접근이 가능하여 보안에 좋습니다. AWS 가입 후 별도로 VPC 설정을 하지 않았다면 퍼블릭 서브넷이 기본으로 생성되어 있습니다.")],-1),T={class:"image-650"},I=n("p",null,[n("strong",null,"Auto-assign public IP"),o(),n("code",null,"Enable")],-1),j=n("ul",null,[n("li",null,[o("공인 아이피 할당 여부를 선택합니다. 외부에서 접근하려면 아이피가 필요하기 때문에 사용함"),n("sup",null,"Enable"),o("으로 설정합니다.")])],-1),N={class:"image-650"},R=n("p",null,[n("strong",null,"Security Group"),o(),n("code",null,"HTTP(80) 포트를 전체(0.0.0.0/0) 허용")],-1),q=n("ul",null,[n("li",null,"방화벽을 설정합니다. 보안에서 가장 신경 써야 할 부분 중 하나로 외부에 포트를 오픈할 땐 항상 주의해야 합니다.")],-1),x={class:"image-650"},z=n("p",null,[n("strong",null,"IAM instance profile"),o(),n("code",null,"AmazonSSMManagedInstanceCoreRole")],-1),G=n("ul",null,[n("li",null,"IAM 권한을 선택합니다. Session Manager 방식을 사용하기 위해 앞에서 생성한 Role을 선택합니다.")],-1),H={class:"image-650"},V=n("p",null,"나머지 항목은 기본값으로 두고 인스턴스를 생성합니다.",-1),W=n("p",null,[o("잠시 후, 인스턴스가 생성되고 부팅이 완료되면 "),n("code",null,"Connect"),o(" 버튼이 활성화됩니다.")],-1),B={class:"image-450"},K=n("p",null,[n("code",null,"Connect"),o("를 누르면 여러 가지 접속 방법을 보여주는데")],-1),O={class:"image-700"},U=n("p",null,"Session Manager를 선택합니다.",-1),L=e('<p>🎉 짠! 웹 기반 터미널로 가상머신에 접속했습니다.</p><div class="tip custom-block"><p class="custom-block-title">AWS System Manager 더보기</p><p>📔 <a href="https://docs.aws.amazon.com/ec2/index.html" target="_blank" rel="noopener noreferrer">EC2(Amazon Elastic Compute Cloud) 공식문서</a><br> 📝 <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started-enable-ssh-connections.html" target="_blank" rel="noopener noreferrer">Session Manager로 SSH 접속하기</a><br> 📝 <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-getting-started-configure-preferences.html" target="_blank" rel="noopener noreferrer">Session Manager 설정하기</a></p></div><h2 id="github-deploy-key-설정" tabindex="-1">GitHub Deploy Key 설정 <a class="header-anchor" href="#github-deploy-key-설정" aria-hidden="true">#</a></h2><p>GitHub 저장소에 접근하려면 <a href="https://docs.github.com/en/developers/overview/managing-deploy-keys" target="_blank" rel="noopener noreferrer">여러가지 방법</a>이 있는데 서버에서 사용하기 적합한 Deploy Key 방식을 이용합니다.</p><p>Deploy Key 설정을 위해 개인키를 생성합니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 접속 유저를 ssm-user에서 ec2-user로 변경 (앞으로 모든 명령어는 ec2-user로 수행. 매 접속시마다 실행)</span></span>\n<span class="line"><span style="color:#A6ACCD;">sudo su ec2-user</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 개인키 + 공개키 생성</span></span>\n<span class="line"><span style="color:#A6ACCD;">ssh-keygen -t ed25519 -C </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">awesome-api</span><span style="color:#89DDFF;">&quot;</span></span>\n<span class="line"></span></code></pre></div><p>저장 위치와 암호를 물어보는데 그냥 엔터를 입력합니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">Generating public/private ed25519 key pair.</span></span>\n<span class="line"><span style="color:#A6ACCD;">Enter file </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> which to save the key </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">/home/ec2-user/.ssh/id_ed25519</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">Enter passphrase </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">empty </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> no passphrase</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span></span>\n<span class="line"><span style="color:#A6ACCD;">Enter same passphrase again:</span></span>\n<span class="line"><span style="color:#A6ACCD;">Your identification has been saved </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> /home/ec2-user/.ssh/id_ed25519.</span></span>\n<span class="line"><span style="color:#A6ACCD;">Your public key has been saved </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> /home/ec2-user/.ssh/id_ed25519.pub.</span></span>\n<span class="line"><span style="color:#A6ACCD;">The key fingerprint is:</span></span>\n<span class="line"><span style="color:#A6ACCD;">SHA256:NPwKisflhIrCK+/dBoUpYR0xCM812349V9lNoTCUuYI awesome-api</span></span>\n<span class="line"><span style="color:#A6ACCD;">The key</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">s randomart image is:</span></span>\n<span class="line"><span style="color:#C3E88D;">+--[ED25519 256]--+</span></span>\n<span class="line"><span style="color:#C3E88D;">|ooo=+o .+= oo.   |</span></span>\n<span class="line"><span style="color:#C3E88D;">| *= o. .=o...    |</span></span>\n<span class="line"><span style="color:#C3E88D;">|..+. = .+..      |</span></span>\n<span class="line"><span style="color:#C3E88D;">|  ..E.+..o       |</span></span>\n<span class="line"><span style="color:#C3E88D;">|   ..o+.S .      |</span></span>\n<span class="line"><span style="color:#C3E88D;">| *= o. .=o...    |</span></span>\n<span class="line"><span style="color:#C3E88D;">|..+. = .+..      |</span></span>\n<span class="line"><span style="color:#C3E88D;">|  ..E.+..o       |</span></span>\n<span class="line"><span style="color:#C3E88D;">|   ..o+.S .      |</span></span>\n<span class="line"><span style="color:#C3E88D;">+----[SHA256]-----+</span></span>\n<span class="line"></span></code></pre></div><p>생성한 공개키 값을 확인합니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 공개키 출력</span></span>\n<span class="line"><span style="color:#A6ACCD;">cat </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_ed25519.pub</span></span>\n<span class="line"></span></code></pre></div><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB1Ir2w8wBIEk7QyVEkBUNPlSanejN1mxPZjdoG6tx56 awesome-api</span></span>\n<span class="line"></span></code></pre></div><p>출력결과를 드래그 하고 복사한 다음, GitHub 저장소의 Settings 메뉴에서 Deploy key를 추가합니다.</p><p>Title 없이 Key만 입력합니다.</p>',13),$={class:"image-550"},Y=e('<p>이제 서버에서 GitHub에 접근할 수 있는 권한이 추가되었습니다.</p><h2 id="node-js-배포" tabindex="-1">Node.js 배포 <a class="header-anchor" href="#node-js-배포" aria-hidden="true">#</a></h2><p>모든 준비가 끝났으니 본격적으로 Node.js를 설치합니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># Node.js 버전 관리자 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> bash</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># nvm 활성화</span></span>\n<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.nvm/nvm.sh</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># Node.js 16버전 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">nvm install 16</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 설치 확인</span></span>\n<span class="line"><span style="color:#A6ACCD;">node -v</span></span>\n<span class="line"></span></code></pre></div><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">v16.14.2</span></span>\n<span class="line"></span></code></pre></div><p>GitHub 저장소에서 소스를 가져옵니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># Git 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">sudo yum install git -y</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 경로 이동</span></span>\n<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 저장소 가져오기</span></span>\n<span class="line"><span style="color:#A6ACCD;">git clone git@github.com:subicura/awesome-api-server.git</span></span>\n<span class="line"></span></code></pre></div><p>패키지를 설치하고 웹서버를 실행합니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 경로 이동</span></span>\n<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/awesome-api-server</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># node 패키지 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm install</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 웹 서버 실행</span></span>\n<span class="line"><span style="color:#A6ACCD;">nohup npm start </span><span style="color:#89DDFF;">&amp;</span></span>\n<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">nohup</p><p>nohup 명령어는 리눅스에서 프로세스를 실행한 터미널의 연결이 끊어지더라도 계속해서 동작 할 수 있게 해주는 명령어입니다.</p></div><p>80 포트는 <code>root</code> 계정만 접근할 수 있기 때문에, 3000 포트로 실행한 웹서버를 80 포트랑 연결해 줍니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 80 포트로 들어온 요청을 3000 포트로 연결</span></span>\n<span class="line"><span style="color:#A6ACCD;">sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000</span></span>\n<span class="line"></span></code></pre></div><p>EC2 서버의 공인 IP를 확인하고 테스트합니다. 정상적으로 배포가 완료되었습니다!</p>',13),Z=e('<h2 id="pm2" tabindex="-1">PM2 <a class="header-anchor" href="#pm2" aria-hidden="true">#</a></h2><p>PM2는 운영환경에서 사용할 수 있는 강력한 프로세스 관리자입니다. 여러 개의 인스턴스를 생성하고 모니터링하고 무중단 배포를 가능하게 합니다. (그 외에도 원격 배포 등 다양한 기능이 있습니다.)</p><p>PM2를 설치하고 사용법을 알아봅니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 전역적으로 pm2 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm install pm2 -g</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 버전 확인</span></span>\n<span class="line"><span style="color:#A6ACCD;">pm2 -version</span></span>\n<span class="line"></span></code></pre></div><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">                        -------------</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">__/\\\\\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\\\____________/\\\\\\\\____/\\\\\\\\\\\\\\\\\\_____</span></span>\n<span class="line"><span style="color:#A6ACCD;"> _\\/\\\\\\/////////\\\\\\_\\/\\\\\\\\\\\\________/\\\\\\\\\\\\__/\\\\\\///////\\\\\\___</span></span>\n<span class="line"><span style="color:#A6ACCD;">  _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\//\\\\\\____/\\\\\\//\\\\\\_\\///______\\//\\\\\\__</span></span>\n<span class="line"><span style="color:#A6ACCD;">   _\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/__\\/\\\\\\\\///\\\\\\/\\\\\\/_\\/\\\\\\___________/\\\\\\/___</span></span>\n<span class="line"><span style="color:#A6ACCD;">    _\\/\\\\\\/////////____\\/\\\\\\__\\///\\\\\\/___\\/\\\\\\________/\\\\\\//_____</span></span>\n<span class="line"><span style="color:#A6ACCD;">     _\\/\\\\\\_____________\\/\\\\\\____\\///_____\\/\\\\\\_____/\\\\\\//________</span></span>\n<span class="line"><span style="color:#A6ACCD;">      _\\/\\\\\\_____________\\/\\\\\\_____________\\/\\\\\\___/\\\\\\/___________</span></span>\n<span class="line"><span style="color:#A6ACCD;">       _\\/\\\\\\_____________\\/\\\\\\_____________\\/\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_</span></span>\n<span class="line"><span style="color:#A6ACCD;">        _\\///______________\\///______________\\///__\\///////////////__</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                          Runtime Edition</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">        PM2 is a Production Process Manager </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> Node.js applications</span></span>\n<span class="line"><span style="color:#A6ACCD;">                     with a built-in Load Balancer.</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                Start and Daemonize any application:</span></span>\n<span class="line"><span style="color:#A6ACCD;">                $ pm2 start app.js</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                Load Balance 4 instances of api.js:</span></span>\n<span class="line"><span style="color:#A6ACCD;">                $ pm2 start api.js -i 4</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                Monitor </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> production:</span></span>\n<span class="line"><span style="color:#A6ACCD;">                $ pm2 monitor</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                Make pm2 auto-boot at server restart:</span></span>\n<span class="line"><span style="color:#A6ACCD;">                $ pm2 startup</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                To go further checkout:</span></span>\n<span class="line"><span style="color:#A6ACCD;">                http://pm2.io/</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line"><span style="color:#A6ACCD;">                        -------------</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">PM2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Spawning PM2 daemon with pm2_home=/Users/cs.kim/.pm2</span></span>\n<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">PM2</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> PM2 Successfully daemonized</span></span>\n<span class="line"><span style="color:#A6ACCD;">5.2.0</span></span>\n<span class="line"></span></code></pre></div><p>버전만 확인하려고 했는데 뭔가 큰 로고랑 소개, 간단한 사용법도 출력되었습니다. PM2 설정 파일을 만듭니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># PM2 기본 설정 파일 생성</span></span>\n<span class="line"><span style="color:#A6ACCD;">pm2 init simple</span></span>\n<span class="line"></span></code></pre></div><p>생성된 <code>ecosystem.config.js</code>을 다음과 같이 수정합니다.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">apps</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">awesome-api</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./src/server.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">exec_mode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cluster</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">},</span></span>\n<span class="line"><span style="color:#A6ACCD;">  ]</span><span style="color:#89DDFF;">,</span></span>\n<span class="line"><span style="color:#89DDFF;">};</span></span>\n<span class="line"></span></code></pre></div><p>추가한 설정파일을 커밋하고 GitHub 저장소에 push 한 다음 EC2 서버에서 pull 하고 실행해봅니다.</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># 실행중인 Node.js 프로세스 중지</span></span>\n<span class="line"><span style="color:#82AAFF;">kill</span><span style="color:#A6ACCD;"> -9 </span><span style="color:#89DDFF;">`</span><span style="color:#C3E88D;">ps -ef </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> grep </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">node</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> grep -v grep </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> awk </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{print $2}</span><span style="color:#89DDFF;">&#39;`</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># 서버에도 PM2 설치</span></span>\n<span class="line"><span style="color:#A6ACCD;">npm install pm2 -g</span></span>\n<span class="line"><span style="color:#676E95;font-style:italic;"># PM2 실행</span></span>\n<span class="line"><span style="color:#A6ACCD;">pm2 start</span></span>\n<span class="line"></span></code></pre></div><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">┌─────┬────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐</span></span>\n<span class="line"><span style="color:#A6ACCD;">│ id  │ name           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │</span></span>\n<span class="line"><span style="color:#A6ACCD;">├─────┼────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤</span></span>\n<span class="line"><span style="color:#A6ACCD;">│ 0   │ awesome-api    │ default     │ 1.0.0   │ fork    │ 2477     │ 0s     │ 0    │ online    │ 0%       │ 31.2mb   │ ec2-user │ disabled │</span></span>\n<span class="line"><span style="color:#A6ACCD;">└─────┴────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘</span></span>\n<span class="line"></span></code></pre></div><p>pm2가 Node.js 웹 애플리케이션을 성공적으로 실행했습니다. 테스트해보니 정상적으로 동작합니다!</p><p>소스를 수정하진 않았지만, 서버를 재시작 해볼까요?</p><div class="language-sh"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># PM2 앱 재시작</span></span>\n<span class="line"><span style="color:#A6ACCD;">pm2 reload awesome-api</span></span>\n<span class="line"></span></code></pre></div><p>중단 없이 성공적으로 재시작 했습니다. PM2가 프로세스를 새로 생성하고 이전 프로세스를 중단하는 과정을 자연스럽게 처리하면서 간편하게 무중단 배포를 구현했습니다.</p><p><code>src/app.js</code> 파일을 수정하고 수정사항이 잘 적용되는지 확인해봅니다.</p><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/ping</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>\n<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// return { status: &quot;ok&quot; }; // ⇠ 삭제</span></span>\n<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> status</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pong</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">};</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// ⇠ 추가</span></span>\n<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>\n<span class="line"></span></code></pre></div><p>파일을 수정하고 재시작(<code>pm2 reload awesome-api</code>)합니다.</p><p>🎉 성공! 수정사항이 잘 반영되었습니다.</p><div class="tip custom-block"><p class="custom-block-title">PM2 더보기</p><p>📔 <a href="https://pm2.keymetrics.io/docs/usage/quick-start/" target="_blank" rel="noopener noreferrer">PM2 공식문서</a><br> 📔 <a href="https://pm2.keymetrics.io/docs/usage/application-declaration/" target="_blank" rel="noopener noreferrer">PM2 설정파일</a><br> 📝 <a href="https://pm2.keymetrics.io/docs/usage/cluster-mode/" target="_blank" rel="noopener noreferrer">클러스터 모드</a><br> 📝 <a href="https://pm2.keymetrics.io/docs/usage/signals-clean-restart/" target="_blank" rel="noopener noreferrer">Graceful start/shutdown</a></p></div><h2 id="마무리" tabindex="-1">마무리 <a class="header-anchor" href="#마무리" aria-hidden="true">#</a></h2><p>서버 배포를 위한 최소한의 기능을 알아보았습니다. 전체 배포 과정을 요약하면 다음과 같습니다.</p><ol><li>SSH대신 Session Manager를 사용하기 위해 IAM 생성</li><li>공인 IP를 가진 EC2 생성</li><li>nvm을 이용하여 Node.js 설치</li><li>소스 가져오기</li><li>PM2로 프로세스 관리 및 업데이트</li></ol><p>여기에 몇 가지 서비스를 붙이면 그럴듯한 배포 시스템이 완성됩니다.</p><p>그럼 여러 대의 서버를 이용한 보다 안정적인 배포 방식을 알아보겠습니다.</p>',26);var J=s(i,[["render",function(s,e,o,r,i,J){const Q=t("custom-image"),X=t("Chat-KakaoMsg"),ss=t("Chat-KakaoRoom");return c(),a("div",null,[y,n("div",D,[l(Q,{src:"/imgs/aws-deploy/beanstalk-status.png",alt:"Beanstalk Status"})]),F,n("div",A,[l(Q,{src:"/imgs/aws-deploy/beanstalk-upload.png",alt:"Beanstalk Upload"})]),l(ss,null,{default:p((()=>[l(X,{msg:"배포중에 문제가 생겼습니다 ㅠㅠㅠㅠㅠㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"앗!! 어떤 문제인가요??",isMe:"false"}),l(X,{msg:"업데이트 중에 502 Bad Gateway 오류가 발생했어요 ㅠㅠㅠㅠㅠ 지금은 괜찮은데.. 잠깐 그랬던 것 같습니다",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"혹시 배포할 때 All at once 정책을 선택하셨나요?",isMe:"false"}),l(X,{msg:"기본값을 썼는데 All at once로 되어 있네요..",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"Beanstalk는 여러 가지 배포 옵션이 있는데 무중단으로 배포하려면 다른 옵션을 선택해야 해요",isMe:"false"}),l(X,{msg:"아.. 몰랐어요 ㅠㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"PaaS는 많은 부분을 알아서 처리해주지만, 문제없이 운영하려면 세부적인 설정도 알아야 해요.",isMe:"false"}),l(X,{msg:"밑바닥부터 서버를 구성하면서 어떤 식으로 동작하는지 알아보죠",isMe:"false"})])),_:1}),C,n("div",_,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-1.png",alt:"IAM - Select trusted entity"})]),d,n("div",u,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-2.png",alt:"IAM - Add permissions"})]),m,n("div",g,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-3.png",alt:"IAM - Name"})]),h,n("div",f,[l(Q,{src:"/imgs/aws-deploy/ec2-ami.png",alt:"EC2 - AMI"})]),v,b,n("div",E,[l(Q,{src:"/imgs/aws-deploy/ec2-instance-type.png",alt:"EC2 - Instance Type"})]),M,S,n("div",k,[l(Q,{src:"/imgs/aws-deploy/ec2-keypair.png",alt:"EC2 - Key Pair"})]),w,P,n("div",T,[l(Q,{src:"/imgs/aws-deploy/ec2-subnet.png",alt:"EC2 - Subnet"})]),I,j,n("div",N,[l(Q,{src:"/imgs/aws-deploy/ec2-public-ip.png",alt:"EC2 - Public IP"})]),R,q,n("div",x,[l(Q,{src:"/imgs/aws-deploy/ec2-sg.png",alt:"EC2 - Security Group"})]),z,G,n("div",H,[l(Q,{src:"/imgs/aws-deploy/ec2-iam.png",alt:"EC2 - IAM Role"})]),V,W,n("div",B,[l(Q,{src:"/imgs/aws-deploy/ec2-detail.png",alt:"EC2 - Menu"})]),K,n("div",O,[l(Q,{src:"/imgs/aws-deploy/ec2-session-manager.png",alt:"EC2 - Connect"})]),U,l(Q,{src:"/imgs/aws-deploy/ec2-ssh.png",alt:"EC2 - SSH"}),L,n("div",$,[l(Q,{src:"/imgs/aws-deploy/github-deploy-keys.png",alt:"EC2 - Deploy Keys"})]),Y,l(ss,null,{default:p((()=>[l(X,{msg:"알려주신 대로 IAM Role을 추가하고 EC2도 만들어서 배포는 잘 됐어요!",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"ㅊㅋㅊㅋ 합니다 ㅎㅎㅎ",isMe:"false"}),l(X,{msg:"근데.. 새 버전으로 배포는 어떻게 하는 걸까요?",isMe:"true"}),l(X,{msg:"최신 소스를 pull 받은 다음 Node.js를 재시작하면 될 것 같은데.. 그럼 재시작하는 동안 서비스가 멈추지 않을까요?? ㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"네네 맞아요",isMe:"false"}),l(X,{msg:"서비스는 멈추면 안 되고 Node.js는 재시작해야 하는 상황이네요. 하지만 Node.js를 재시작하는 동안은 서비스가 당연히 안 될 거고..",isMe:"false"}),l(X,{msg:"맞아요.. 어쩌죠..",isMe:"true"}),l(X,{msg:"쉽게 생각하면 서버를 2대 쓰면 돼요. 1대가 배포 중이더라도 다른 1대가 살아 있으면 서비스가 문제없이 동작하는 거죠",isMe:"false"}),l(X,{msg:"오?!",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"Node.js 생태계엔 PM2라는 프로세스 관리 도구가 있어요",isMe:"false"}),l(X,{msg:"이걸 써서 무중단 배포를 해보죠",isMe:"false"})])),_:1}),Z])}]]);export{r as __pageData,J as default};
