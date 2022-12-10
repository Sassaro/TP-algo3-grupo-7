package trabajoPracticoAlgoritmos2

interface MailSender{
    fun sendMail(mail:Mail)
}

data class Mail(val origen:String,val asunto: String,val mensaje:String)