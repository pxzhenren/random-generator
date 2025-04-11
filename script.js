let savedList = [];
let lastOutput = [];

document.getElementById('saveButton').onclick = function() {
    const input = document.getElementById('inputList').value;
    savedList = input.split('\n').map(item => item.trim()).filter(item => item);
    localStorage.setItem('savedList', JSON.stringify(savedList));
    alert('列表已保存！');
};

document.getElementById('selectButton').onclick = function() {
    const outputCount = parseInt(document.getElementById('outputCount').value) || 1; // 默认1
    const uniqueOptions = savedList.filter(item => !lastOutput.includes(item));
    
    if (uniqueOptions.length === 0) {
        alert('没有可选择的选项！');
        return;
    }

    const selectedOptions = [];
    for (let i = 0; i < outputCount; i++) {
        if (uniqueOptions.length === 0) break; // 没有选项可选，退出
        const randomIndex = Math.floor(Math.random() * uniqueOptions.length);
        const selectedOption = uniqueOptions[randomIndex];
        selectedOptions.push(selectedOption);
        lastOutput.push(selectedOption);
        uniqueOptions.splice(randomIndex, 1); // 移除已选择的选项
    }

    // 清空以前的输出
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // 清空当前输出

    // 将每个选项作为新行添加
    selectedOptions.forEach(option => {
        const p = document.createElement('p'); // 创建一个新的段落元素
        p.textContent = option; // 设置内容
        outputDiv.appendChild(p); // 将新段落添加到输出容器
    });
};
