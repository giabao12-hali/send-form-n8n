import './App.css'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { submitForm } from './api/submitForm.service'

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Thông tin bắt buộc"
  }),
  email: z.string().email({
    message: "Email không hợp lệ"
  }),
  content: z.string().optional(),
  phoneNumber: z.string().min(3, {
    message: "Thông tin bắt buộc"
  })
})

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      content: "",
      phoneNumber: ""
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    submitForm(data)
      .then((result) => {
        console.log("Webhook Response:", result);
        alert("Đã gửi form thành công!");
      })
      .catch((error) => {
        console.error("Lỗi gửi form:", error);
        alert("Gửi form thất bại!");
      });
  }

  return (
    <div className='container mx-auto flex justify-center items-center flex-col h-screen'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle>Thư đăng ký tuyển dụng</CardTitle>
          <CardDescription>Tuyển dụng ngay</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập họ tên' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới thiệu bản thân</FormLabel>
                    <FormControl>
                      <Input placeholder='Giới thiệu về một chút bản thân...' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập số điện thoại' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit'>Gửi</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
