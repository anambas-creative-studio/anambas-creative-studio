Add-Type -AssemblyName System.Drawing
$inputFile = "d:\Anambas Ai Studio\WEB\anambas-creative-studio\public\assets\img\og-preview.png"
$outputFile = "d:\Anambas Ai Studio\WEB\anambas-creative-studio\public\assets\img\og-preview.jpg"

if (Test-Path $outputFile) {
    Remove-Item $outputFile -Force
}

$img = [System.Drawing.Image]::FromFile($inputFile)

# Set up JPEG encoder with 60% quality to ensure small file size
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$encoderParams = New-Object -TypeName System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object -TypeName System.Drawing.Imaging.EncoderParameter($encoder, [long]60)
$jpegCodecInfo = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$img.Save($outputFile, $jpegCodecInfo[0], $encoderParams)
$img.Dispose()

$size = (Get-Item $outputFile).Length
Write-Output "Conversion done. Size: $size bytes"
