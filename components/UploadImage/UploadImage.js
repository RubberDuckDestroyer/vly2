import { Upload, Icon, message } from 'antd'

const Dragger = Upload.Dragger

const props = {
  name: 'file',
  multiple: false,
  action: '', // Look into this
  onChange (info) {
    const status = info.file.status
    if (status !== 'uploading') {
      console.log(info.file)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}

const UploadImage = () => (
  <Dragger {...props}>
    <p className='ant-upload-drag-icon'>
      <Icon type='inbox' />
    </p>
    <p className='ant-upload-text'>Click or drag file to this area to upload</p>
    <p className='ant-upload-hint'>Support for a single upload. Strictly prohibit from uploading company data or other banned files
    </p>
  </Dragger>
)

export default UploadImage
