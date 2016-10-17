'use strict'
import React,{Component} from "react";

class AboutUs extends Component{
    render(){
        return (
            <div className="aboutus-content">
                <h3>
                    <span className="title">关于我们</span>
                </h3>
                <div className="img-wrap"><img src="asset/images/gywm.gif" /></div>
                <p>湖南友阿云商网络有限公司旗下友阿海外购平台是由深交所上市公司湖南友谊阿波罗商业股份有限公司投资亿元建设的O2O跨境电商平台，2015年6月13日正式上线。海外购所售商品涵盖母婴用品、美容彩妆、营养保健、家居个护、国际轻奢等多个品类,消费者可直接在友阿海外购上买到来自英国、美国、德国、荷兰、日本等22个国家和地区的海外正品。友阿海外购以“足不出户 轻松淘遍海外尖货”为目标，为全国的海淘用户提供更为便捷、安全和实惠的海外正品购物体验。</p>
                <div className="m-entry">
                    <span><i></i>海外直采</span>
                    <span><i></i>自营正品</span>
                    <span><i></i>海关监管</span>
                    <span><i></i>无忧退货</span>
                </div>
                <p>友阿海外购所售商品均为：原产地直采、保税区发货、海外直邮，品质有保障、海关监管、极速直达、国内售后。</p>
                <p>友阿海外购坚持“线上支付+线下体验”的O2O模式，除线上销售，目前友阿海外购同时在友阿旗下门店开出家O2O跨境电商体验店，让消费者对海淘流程的每环节了然于心，并在体验店中就可现场了解或体验到商品实物，再进行线上下单，保证“所见即所购”。</p>
                <p>友阿海外购秉承着友阿诚信为本，顾客至上的的经营理念，为广大客户提供最优质的商品和服务，立志成为中国跨境电子商务的领头羊，让每一个消费者都能买到放心、优质、舒心的海外商品。</p>
                <div className="copyright">
                    <em>Copyright@2014-2016</em>
                    <span>湖南友阿云商网络有限公司</span>
                </div>
            </div>
        )
    }
}

export default AboutUs;