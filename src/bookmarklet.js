(function () {
    const styles = {
        buy: {
            whale: { bg: '#15803d', text: '#ffffff' },
            dolphin: { bg: '#22c55e', text: '#ffffff' },
            shrimp: { bg: '#86efac', text: '#166534' },
            fish: { bg: '#dcfce7', text: '#15803d' },
            plankton: { bg: '#f0fdf4', text: '#166534' }
        },
        sell: {
            whale: { bg: '#7f1d1d', text: '#ffffff' },
            dolphin: { bg: '#ef4444', text: '#ffffff' },
            shrimp: { bg: '#fca5a5', text: '#991b1b' },
            fish: { bg: '#fee2e2', text: '#b91c1c' },
            plankton: { bg: '#fef2f2', text: '#991b1b' }
        }
    };

    const applyColorsToRow = (row) => {
        const typeDiv = row.querySelector('.custom-5sgvd2');
        const usdDiv = row.querySelector('.custom-ujwk84');
        if (!typeDiv || !usdDiv) return;

        const isBuy = typeDiv.textContent.trim().toLowerCase() === 'buy';
        const usdAmount = parseFloat(usdDiv.textContent.replace(/[^0-9.]/g, '')) || 0;

        let rank = "plankton";
        if (usdAmount >= 10000) {
            rank = "whale";
        } else if (usdAmount >= 1000) {
            rank = "dolphin";
        } else if (usdAmount >= 250) {
            rank = "shrimp";
        } else if (usdAmount >= 10) {
            rank = "fish";
        } else {
            rank = "plankton";
        }

        const side = isBuy ? 'buy' : 'sell';
        const config = styles[side][rank];

        row.style.setProperty('background-color', config.bg, 'important');

        const textElements = row.querySelectorAll('div, span, td, a');
        textElements.forEach(el => {
            el.style.setProperty('color', config.text, 'important');
            if (el.tagName === 'TD') {
                el.style.setProperty('--ds-log-stream-volume-usd-bg', 'transparent', 'important');
            }
        });
    };

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const rows = node.tagName === 'TR' ? [node] : node.querySelectorAll('tr.custom-1jrcg3g');
                        rows.forEach(applyColorsToRow);
                    }
                });
            } else if (mutation.type === 'characterData' || mutation.type === 'subtree') {
                let target = mutation.target.parentElement;
                while (target && target.tagName !== 'TR') {
                    target = target.parentElement;
                }
                if (target && target.classList.contains('custom-1jrcg3g')) {
                    applyColorsToRow(target);
                }
            }
        });
    });

    const targetNode = document.querySelector('tbody[data-testid="virtuoso-item-list"]');
    if (targetNode) {
        document.querySelectorAll('tr.custom-1jrcg3g').forEach(applyColorsToRow);
        observer.observe(targetNode, { childList: true, subtree: true, characterData: true });
        alert("色分けツールを起動しました！");
    } else {
        alert("テーブルが見つかりません。Transactionsタブを開いているか確認してください。");
    }
})();
