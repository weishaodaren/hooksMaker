import React, { useEffect, useState, useCallback } from 'react';
import { render } from 'react-dom';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

/**
 * Type
 * @description 提示框状态常量
 */
type AlertStatus = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

/**
 * Interface
 * @description 接受参数接口
 */
interface AltertParams {
  icon: AlertStatus;
  message: string;
}

/**
 * Hooks
 * @description Alert组件
 *  状态 'success' 'error' 'info' 'warning'
 */
const useAlert = () => {
  const [message, setMessage] = useState<null | string>(null); // 控制信息展示
  const [status, setStatus] = useState<null | AlertStatus>(null); // 控制展示状态
  const [visible, setVisible] = useState(false); // 控制显示隐藏

  /**
   * Callback
   * @description 显示Alert
   */
  const onOpen: (T: AltertParams) => void = useCallback((T) => {
    setVisible(true);
    setStatus(T?.icon);
    setMessage(T?.message);
  }, []);

  /**
   * Callback
   * @description 关闭Alert
   */
  const onClose: () => void = useCallback(() => setVisible(false), []);

  const Alert: () => JSX.Element = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={visible}
      onClose={onClose}
    >
      <MuiAlert severity={status} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );

  /**
   * Effect
   * @description 监听信息 展示
   */
  useEffect(() => {
    // 如果存在信息
    if (!message) return () => {};
    // 创建dom元素
    const element: HTMLDivElement = document.createElement('div');
    // 追加body
    document.body.appendChild(element);
    render(<Alert />, element);

    // 计时器延时2s移除dom元素
    const timer = setTimeout(() => {
      document.body.removeChild(element);
    }, 2000);

    return () => {
      // 卸载时删除自身 清空计时器
      element.remove();
      clearTimeout(timer);
    };
  }, [message, visible]);

  return [onOpen];
};

export { useAlert };
export type { AlertStatus };
