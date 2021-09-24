import { Button } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import React from 'react';

export default function SelectRoom() {
    return (
        <div className="w-full h-screen">
            <div className="text-center text-3xl">部屋を選択</div>
            <div className="text-center">
                検索
                <p><textarea></textarea></p>
            </div>
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    {/* <table className="table-auto">     */}
                        <thead className="text-center">
                            <tr>
                                <th col-span="3">部屋の一覧</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-red-400">
                                <td> 
                                    <p>部屋の名前</p>
                                </td>
                                <td>
                                    <p>コメント</p>
                                </td>
                                <td>
                                    参加
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <p>楽天ファン</p>
                                </td>
                                <td>
                                    <p>みんなで楽しみましょう。</p>
                                </td>
                                <td>
                                    <div className="m-3">
                                        <button className="px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500">Button</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <p>巨人ファン</p>
                                </td>
                                <td>
                                    <p>みんなで楽しみましょう。</p>
                                </td>
                                <td>
                                    <div className="m-3">
                                        <button className="px-2 py-1 bg-red-400 text-white font-semibold rounded hover:bg-red-500">Button</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}