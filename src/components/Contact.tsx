import Image from 'next/image'
import AnimatedTitle from './AnimatedTitle'
import Button from './Button'

type ImageClipBoxProps = {
  src: string
  clipClass: string
}

const ImageClipBox = ({ src, clipClass }: ImageClipBoxProps) => (
  <div className={clipClass}>
    <Image
      src={src}
      alt=""
      fill
      className="object-cover"
    />
  </div>
)

const Contact = () => (
  <div
    id="contact"
    className="my-20 min-h-96 w-screen px-10"
  >
    <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
      <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
        <ImageClipBox
          src="/img/image-1.jpg"
          clipClass="contact-clip-path-1"
        />
        <ImageClipBox
          src="/img/image-2.jpg"
          clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
        />
      </div>

      <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
        <ImageClipBox
          src="/img/image-3.jpg"
          clipClass="sword-man-clip-path md:scale-125"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="mb-10 font-general text-[10px] uppercase">
          Gostou da jornada até aqui
        </p>

        <AnimatedTitle
          title="Vamos fazer historia juntos, estou a disposicao para mais um projeto."
          className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
        />

        <Button
          title="Contrate agora"
          containerClass="mt-10 cursor-pointer"
        />
      </div>
    </div>
  </div>
)

export default Contact
