@For /F "UseBackQ Delims=" %%A In ("./extracted-urls.txt"
) Do @LightHouse "%%A"  --disable-storage-reset --emulated-form-factor=desktop   --throttling-method=provided  --view --only-categories=performance,accessibility --output=json --output=html
