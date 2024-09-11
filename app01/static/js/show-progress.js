// 显示进度条
function showProgress() {
    console.log('Showing progress bar');
    $('#progressContainer').removeClass('hidden').show();
}

// 隐藏进度条
function hideProgress() {
    $('#progressContainer').addClass('hidden');
}

// 更新进度条
function updateProgress(percent) {
    console.log('Updating progress:', percent + '%');
    $('#progressBar').css('width', percent + '%')
        .attr('aria-valuenow', percent)
        .text(percent + '%');
}

// 显示警告框
function showAlert(type, message) {
    $('#alertBox').removeClass('hidden alert-success alert-info alert-warning alert-danger')
        .addClass('alert-' + type)
        .find('.alert-message').text(message);
}

// 隐藏警告框
function hideAlert() {
    $('#alertBox').addClass('hidden');
}

// 处理文件上传
function handleFileUpload(formData, url) {
    showProgress();
    hideAlert(); // 每次上传前隐藏警告框

    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    updateProgress(percentComplete);

                    if (percentComplete === 100) {
                        // 成功完成上传后显示成功消息
                        showAlert('success', '文件上传成功');
                    }
                }
            }, false);
            return xhr;
        },
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            hideProgress();
            showAlert('success', response.message || '文件上传成功');
            console.log('文件上传成功:', response);
        },
        error: function (response) {
            hideProgress();
            // 确保 response.responseJSON 存在并包含 error 属性
            // let errorMessage = response.responseJSON && response.responseJSON.error ? response.responseJSON.error : '文件上传失败，请重试';
            showAlert("danger", " 文件 上传失败，请重试 ");
            console.error('文件上传失败:', response);
        }
    });
}

// 初始化文件上传
function initFileUpload() {
    $('#uploadForm').on('submit', function (e) {
        // 阻止默认表单提交
        e.preventDefault();

        var formData = new FormData(this);

        handleFileUpload(formData, '/bill/upload/');
    });
}