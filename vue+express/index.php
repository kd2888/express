
<?php  
/* 
    方倍工作室 http://www.fangbei.org/ 
    CopyRight 2015 All Rights Reserved 
*/  
header('Content-type:text');  
  
define("TOKEN", "dadong");  
  
$wechatObj = new wechatCallbackapiTest();  
if (!isset($_GET['echostr'])) {  
    $wechatObj->responseMsg();  
}else{  
    $wechatObj->valid();  
}  
  
class wechatCallbackapiTest  
{  
    //验证签名  
    public function valid()  
    {  
        $echoStr = $_GET["echostr"];  
        $signature = $_GET["signature"];  
        $timestamp = $_GET["timestamp"];  
        $nonce = $_GET["nonce"];  
        $token = TOKEN;  
        $tmpArr = array($token, $timestamp, $nonce);  
        sort($tmpArr, SORT_STRING);  
        $tmpStr = implode($tmpArr);  
        $tmpStr = sha1($tmpStr);  
        if($tmpStr == $signature){  
            echo $echoStr;  
            exit;  
        }  
    }  
  
    //响应消息  
    public function responseMsg()  
    {  
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];  
        if (!empty($postStr)){  
        	
            $this->logger("R \r\n".$postStr);  
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);  
            $RX_TYPE = trim($postObj->MsgType);  
              if($RX_TYPE=='event'){
                  $result = $this->receiveEvent($postObj);
              }else{
                  $result = $this->allEvent($postObj);
              }
            $this->logger("T \r\n".$result);  
            echo $result;  
        }else {  
            echo "";  
            exit;  
        }  
    }


    private function allEvent($object){
 $content = date("Y-m-d H:i:s",time())."\n".'环卫平台欢迎你'."\n".'<a href="main/index.html">进入平台</a>';
      
        $result = $this->transmitNews($object, $content); 
        return $result;
    }
    //接收事件消息  
    private function receiveEvent($object)  
    {  
        $content = "";
        if(($object->Event)=='subscribe'){
            $content = "欢迎来到垃圾分类平台！\n";
//                $content .= (!empty($object->EventKey))?("\n来自二维码场景 ".str_replace("qrscene_","",$object->EventKey)):"";
            $content .= "\n\n".'<img src="http://img2.imgtn.bdimg.com/it/u=3796066259,3802548709&fm=23&gp=0.jpg">\n<a href="main/index.html">进入平台</a>';
        }else{
            $content = date("Y-m-d H:i:s",time())."\n".'<a href="main/index.html">进入平台</a>';
        }

        if(is_array($content)){  
            $result = $this->transmitNews($object, $content);  
        }else{  
            $result = $this->transmitText($object, $content);  
        }  
        return $result;  
    }  

  
    //回复文本消息  
    private function transmitText($object, $content)  
    {  
        if (!isset($content) || empty($content)){  
            return "";  
        }  
  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[text]]></MsgType>  
    <Content><![CDATA[%s]]></Content>  
</xml>";  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time(), $content);  
  
        return $result;  
    }  
  
    //回复图文消息  
    private function transmitNews($object, $newsArray)  
    {  
        if(!is_array($newsArray)){  
            return "";  
        }  
        $itemTpl = "        <item>  
            <Title><![CDATA[%s]]></Title>  
            <Description><![CDATA[%s]]></Description>  
            <PicUrl><![CDATA[%s]]></PicUrl>  
            <Url><![CDATA[%s]]></Url>  
        </item>  
";  
        $item_str = "";  
        foreach ($newsArray as $item){  
            $item_str .= sprintf($itemTpl, $item['Title'], $item['Description'], $item['PicUrl'], $item['Url']);  
        }  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[news]]></MsgType>  
    <ArticleCount>%s</ArticleCount>  
    <Articles>  
$item_str    </Articles>  
</xml>";  
  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time(), count($newsArray));  
        return $result;  
    }  
  
    //回复音乐消息  
    private function transmitMusic($object, $musicArray)  
    {  
        if(!is_array($musicArray)){  
            return "";  
        }  
        $itemTpl = "<Music>  
        <Title><![CDATA[%s]]></Title>  
        <Description><![CDATA[%s]]></Description>  
        <MusicUrl><![CDATA[%s]]></MusicUrl>  
        <HQMusicUrl><![CDATA[%s]]></HQMusicUrl>  
    </Music>";  
  
        $item_str = sprintf($itemTpl, $musicArray['Title'], $musicArray['Description'], $musicArray['MusicUrl'], $musicArray['HQMusicUrl']);  
  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[music]]></MsgType>  
    $item_str  
</xml>";  
  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());  
        return $result;  
    }  
  
    //回复图片消息  
    private function transmitImage($object, $imageArray)  
    {  
        $itemTpl = "<Image>  
        <MediaId><![CDATA[%s]]></MediaId>  
    </Image>";  
  
        $item_str = sprintf($itemTpl, $imageArray['MediaId']);  
  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[image]]></MsgType>  
    $item_str  
</xml>";  
  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());  
        return $result;  
    }  
  
    //回复语音消息  
    private function transmitVoice($object, $voiceArray)  
    {  
        $itemTpl = "<Voice>  
        <MediaId><![CDATA[%s]]></MediaId>  
    </Voice>";  
  
        $item_str = sprintf($itemTpl, $voiceArray['MediaId']);  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[voice]]></MsgType>  
    $item_str  
</xml>";  
  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());  
        return $result;  
    }  
  
    //回复视频消息  
    private function transmitVideo($object, $videoArray)  
    {  
        $itemTpl = "<Video>  
        <MediaId><![CDATA[%s]]></MediaId>  
        <ThumbMediaId><![CDATA[%s]]></ThumbMediaId>  
        <Title><![CDATA[%s]]></Title>  
        <Description><![CDATA[%s]]></Description>  
    </Video>";  
  
        $item_str = sprintf($itemTpl, $videoArray['MediaId'], $videoArray['ThumbMediaId'], $videoArray['Title'], $videoArray['Description']);  
  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[video]]></MsgType>  
    $item_str  
</xml>";  
  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());  
        return $result;  
    }  
  
    //回复多客服消息  
    private function transmitService($object)  
    {  
        $xmlTpl = "<xml>  
    <ToUserName><![CDATA[%s]]></ToUserName>  
    <FromUserName><![CDATA[%s]]></FromUserName>  
    <CreateTime>%s</CreateTime>  
    <MsgType><![CDATA[transfer_customer_service]]></MsgType>  
</xml>";  
        $result = sprintf($xmlTpl, $object->FromUserName, $object->ToUserName, time());  
        return $result;  
    }  
  

  
    //字节转Emoji表情  
    function bytes_to_emoji($cp)  
    {  
        if ($cp > 0x10000){       # 4 bytes  
            return chr(0xF0 | (($cp & 0x1C0000) >> 18)).chr(0x80 | (($cp & 0x3F000) >> 12)).chr(0x80 | (($cp & 0xFC0) >> 6)).chr(0x80 | ($cp & 0x3F));  
        }else if ($cp > 0x800){   # 3 bytes  
            return chr(0xE0 | (($cp & 0xF000) >> 12)).chr(0x80 | (($cp & 0xFC0) >> 6)).chr(0x80 | ($cp & 0x3F));  
        }else if ($cp > 0x80){    # 2 bytes  
            return chr(0xC0 | (($cp & 0x7C0) >> 6)).chr(0x80 | ($cp & 0x3F));  
        }else{                    # 1 byte  
            return chr($cp);  
        }  
    }  
  
    //日志记录  
    private function logger($log_content)  
    {  
        if(isset($_SERVER['HTTP_APPNAME'])){   //SAE  
            sae_set_display_errors(false);  
            sae_debug($log_content);  
            sae_set_display_errors(true);  
        }else if($_SERVER['REMOTE_ADDR'] != "127.0.0.1"){ //LOCAL  
            $max_size = 1000000;  
            $log_filename = "log.xml";  
            if(file_exists($log_filename) and (abs(filesize($log_filename)) > $max_size)){unlink($log_filename);}  
            file_put_contents($log_filename, date('Y-m-d H:i:s')." ".$log_content."\r\n", FILE_APPEND);  
        }  
    }  
}  
?>  

