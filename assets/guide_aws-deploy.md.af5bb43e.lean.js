import{_ as s,c as a,a as n,d as l,w as p,e,b as o,r as t,o as c}from"./app.10725d7d.js";const r=JSON.parse('{"title":"AWS 배포","description":"","frontmatter":{"head":[["meta",{"property":"og:description","content":"AWS 배포 하기"}],["meta",{"property":"twitter:description","content":"AWS 배포 하기"}]]},"headers":[{"level":2,"title":"Beanstalk 업데이트","slug":"beanstalk-업데이트"},{"level":2,"title":"IAM 만들기","slug":"iam-만들기"},{"level":2,"title":"EC2 만들기","slug":"ec2-만들기"},{"level":2,"title":"GitHub Deploy Key 설정","slug":"github-deploy-key-설정"},{"level":2,"title":"Node.js 배포","slug":"node-js-배포"},{"level":2,"title":"PM2","slug":"pm2"},{"level":2,"title":"마무리","slug":"마무리"}],"relativePath":"guide/aws-deploy.md"}'),i={name:"guide/aws-deploy.md"},y=e("",8),D={class:"image-750"},F=n("ol",{start:"2"},[n("li",null,"최신 소스 파일을 업로드 합니다. 그럼 자동으로 업데이트를 진행합니다.")],-1),A={class:"image-550"},C=e("",5),_={class:"image-600"},d=n("ol",{start:"2"},[n("li",null,"AWS에서 미리 만들어 놓은 AmazonSSMManagedInstanceCore Policy를 선택합니다.")],-1),u={class:"image-650"},m=n("ol",{start:"3"},[n("li",null,"마지막으로 이름을 입력하고 Role을 생성합니다.")],-1),g={class:"image-550"},h=e("",7),f={class:"image-650"},v=n("p",null,[n("strong",null,"Instance type"),o(),n("code",null,"t2.micro (1 vCPU / 1 GiB Memory)")],-1),b=n("ul",null,[n("li",null,"CPU와 메모리 성능을 선택합니다.")],-1),E={class:"image-650"},M=n("p",null,[n("strong",null,"Key pair"),o(),n("code",null,"사용하지 않음")],-1),S=n("ul",null,[n("li",null,"서버 콘솔 접근 시 사용할 공개키를 선택합니다. 여기선 AWS Systems Manager를 이용한 Session Manager 방식으로 접근할 거라 사용하지 않습니다.")],-1),k={class:"image-650"},w=n("p",null,[n("strong",null,"Subnet"),o(),n("code",null,"Public 영역 선택")],-1),P=n("ul",null,[n("li",null,"네트워크 서브넷을 선택합니다. 퍼블릭 서브넷과 프라이빗 서브넷이 있는데 퍼블릭 서브넷은 인터넷에 노출되어 있고, 프라이빗 서브넷은 내부망에서만 접근이 가능하여 보안에 좋습니다. AWS 가입 후 별도로 VPC 설정을 하지 않았다면 퍼블릭 서브넷이 기본으로 생성되어 있습니다.")],-1),T={class:"image-650"},I=n("p",null,[n("strong",null,"Auto-assign public IP"),o(),n("code",null,"Enable")],-1),j=n("ul",null,[n("li",null,[o("공인 아이피 할당 여부를 선택합니다. 외부에서 접근하려면 아이피가 필요하기 때문에 사용함"),n("sup",null,"Enable"),o("으로 설정합니다.")])],-1),N={class:"image-650"},R=n("p",null,[n("strong",null,"Security Group"),o(),n("code",null,"HTTP(80) 포트를 전체(0.0.0.0/0) 허용")],-1),q=n("ul",null,[n("li",null,"방화벽을 설정합니다. 보안에서 가장 신경 써야 할 부분 중 하나로 외부에 포트를 오픈할 땐 항상 주의해야 합니다.")],-1),x={class:"image-650"},z=n("p",null,[n("strong",null,"IAM instance profile"),o(),n("code",null,"AmazonSSMManagedInstanceCoreRole")],-1),G=n("ul",null,[n("li",null,"IAM 권한을 선택합니다. Session Manager 방식을 사용하기 위해 앞에서 생성한 Role을 선택합니다.")],-1),H={class:"image-650"},V=n("p",null,"나머지 항목은 기본값으로 두고 인스턴스를 생성합니다.",-1),W=n("p",null,[o("잠시 후, 인스턴스가 생성되고 부팅이 완료되면 "),n("code",null,"Connect"),o(" 버튼이 활성화됩니다.")],-1),B={class:"image-450"},K=n("p",null,[n("code",null,"Connect"),o("를 누르면 여러 가지 접속 방법을 보여주는데")],-1),O={class:"image-700"},U=n("p",null,"Session Manager를 선택합니다.",-1),L=e("",13),$={class:"image-550"},Y=e("",13),Z=e("",26);var J=s(i,[["render",function(s,e,o,r,i,J){const Q=t("custom-image"),X=t("Chat-KakaoMsg"),ss=t("Chat-KakaoRoom");return c(),a("div",null,[y,n("div",D,[l(Q,{src:"/imgs/aws-deploy/beanstalk-status.png",alt:"Beanstalk Status"})]),F,n("div",A,[l(Q,{src:"/imgs/aws-deploy/beanstalk-upload.png",alt:"Beanstalk Upload"})]),l(ss,null,{default:p((()=>[l(X,{msg:"배포중에 문제가 생겼습니다 ㅠㅠㅠㅠㅠㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"앗!! 어떤 문제인가요??",isMe:"false"}),l(X,{msg:"업데이트 중에 502 Bad Gateway 오류가 발생했어요 ㅠㅠㅠㅠㅠ 지금은 괜찮은데.. 잠깐 그랬던 것 같습니다",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"혹시 배포할 때 All at once 정책을 선택하셨나요?",isMe:"false"}),l(X,{msg:"기본값을 썼는데 All at once로 되어 있네요..",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"Beanstalk는 여러 가지 배포 옵션이 있는데 무중단으로 배포하려면 다른 옵션을 선택해야 해요",isMe:"false"}),l(X,{msg:"아.. 몰랐어요 ㅠㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"PaaS는 많은 부분을 알아서 처리해주지만, 문제없이 운영하려면 세부적인 설정도 알아야 해요.",isMe:"false"}),l(X,{msg:"밑바닥부터 서버를 구성하면서 어떤 식으로 동작하는지 알아보죠",isMe:"false"})])),_:1}),C,n("div",_,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-1.png",alt:"IAM - Select trusted entity"})]),d,n("div",u,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-2.png",alt:"IAM - Add permissions"})]),m,n("div",g,[l(Q,{src:"/imgs/aws-deploy/iam-role-step-3.png",alt:"IAM - Name"})]),h,n("div",f,[l(Q,{src:"/imgs/aws-deploy/ec2-ami.png",alt:"EC2 - AMI"})]),v,b,n("div",E,[l(Q,{src:"/imgs/aws-deploy/ec2-instance-type.png",alt:"EC2 - Instance Type"})]),M,S,n("div",k,[l(Q,{src:"/imgs/aws-deploy/ec2-keypair.png",alt:"EC2 - Key Pair"})]),w,P,n("div",T,[l(Q,{src:"/imgs/aws-deploy/ec2-subnet.png",alt:"EC2 - Subnet"})]),I,j,n("div",N,[l(Q,{src:"/imgs/aws-deploy/ec2-public-ip.png",alt:"EC2 - Public IP"})]),R,q,n("div",x,[l(Q,{src:"/imgs/aws-deploy/ec2-sg.png",alt:"EC2 - Security Group"})]),z,G,n("div",H,[l(Q,{src:"/imgs/aws-deploy/ec2-iam.png",alt:"EC2 - IAM Role"})]),V,W,n("div",B,[l(Q,{src:"/imgs/aws-deploy/ec2-detail.png",alt:"EC2 - Menu"})]),K,n("div",O,[l(Q,{src:"/imgs/aws-deploy/ec2-session-manager.png",alt:"EC2 - Connect"})]),U,l(Q,{src:"/imgs/aws-deploy/ec2-ssh.png",alt:"EC2 - SSH"}),L,n("div",$,[l(Q,{src:"/imgs/aws-deploy/github-deploy-keys.png",alt:"EC2 - Deploy Keys"})]),Y,l(ss,null,{default:p((()=>[l(X,{msg:"알려주신 대로 IAM Role을 추가하고 EC2도 만들어서 배포는 잘 됐어요!",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"ㅊㅋㅊㅋ 합니다 ㅎㅎㅎ",isMe:"false"}),l(X,{msg:"근데.. 새 버전으로 배포는 어떻게 하는 걸까요?",isMe:"true"}),l(X,{msg:"최신 소스를 pull 받은 다음 Node.js를 재시작하면 될 것 같은데.. 그럼 재시작하는 동안 서비스가 멈추지 않을까요?? ㅠㅠ",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"네네 맞아요",isMe:"false"}),l(X,{msg:"서비스는 멈추면 안 되고 Node.js는 재시작해야 하는 상황이네요. 하지만 Node.js를 재시작하는 동안은 서비스가 당연히 안 될 거고..",isMe:"false"}),l(X,{msg:"맞아요.. 어쩌죠..",isMe:"true"}),l(X,{msg:"쉽게 생각하면 서버를 2대 쓰면 돼요. 1대가 배포 중이더라도 다른 1대가 살아 있으면 서비스가 문제없이 동작하는 거죠",isMe:"false"}),l(X,{msg:"오?!",isMe:"true"}),l(X,{avatar:"senior",user:"촋 CTO",msg:"Node.js 생태계엔 PM2라는 프로세스 관리 도구가 있어요",isMe:"false"}),l(X,{msg:"이걸 써서 무중단 배포를 해보죠",isMe:"false"})])),_:1}),Z])}]]);export{r as __pageData,J as default};
