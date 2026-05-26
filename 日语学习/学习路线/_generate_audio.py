"""批量生成 92 个雅思五十音造句的 Nanami Neural mp3"""
import asyncio
import edge_tts
import os
import sys
import io

# 在 Windows 下确保 stdout 是 UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SENTENCES = [
    # 平假名 46 句
    "朝ご飯を食べました。",
    "妹がいます。",
    "夏に海へ行きます。",
    "駅はあそこにあります。",
    "毎日お茶を飲みます。",
    "学校で日本語を勉強します。",
    "庭に大きい木があります。",
    "車で会社へ行きます。",
    "携帯を使ってもいいですか。",
    "子供が好きです。",
    "寒いから、コートを着ます。",
    "ここで写真を撮ってください。",
    "寿司が食べたいです。",
    "先生と一緒に話します。",
    "空が青いですね。",
    "今、ご飯を食べています。",
    "父は医者です。",
    "机の上に本があります。",
    "友達に手紙を書きました。",
    "友達と映画を見ませんか。",
    "夏は暑くて、長いです。",
    "日本から来ました。",
    "玄関で靴を脱ぎます。",
    "私も猫が好きです。",
    "薬を飲んだほうがいいです。",
    "この花はきれいですね。",
    "飛行機に乗ったことがあります。",
    "冬は寒いですが、好きです。",
    "部屋に弟がいます。",
    "寝る前に本を読みます。",
    "毎日学校へ行きます。",
    "水がほしいです。",
    "日本語は難しくないです。",
    "眼鏡をかけている人は誰ですか。",
    "桃やりんごを買いました。",
    "富士山は日本で一番高い山です。",
    "明日は雪が降るでしょう。",
    "音楽を聞きながら本を読みます。",
    "来年日本へ行きたいです。",
    "旅行に行きましょう。",
    "父は今、留守です。",
    "冷蔵庫の中にビールがあります。",
    "毎朝六時に起きます。",
    "私は中国人です。",
    "毎晩本を読みます。",
    "みかんが三つあります。",
    # 片假名 46 句
    "アメリカへ行ったことがあります。",
    "インターネットで調べました。",
    "ウーロン茶は飲みません。",
    "暑いから、エアコンをつけます。",
    "オレンジは甘いです。",
    "新しいカメラがほしいです。",
    "キムチも好きです。",
    "母とクッキーを作ります。",
    "誕生日にケーキを食べました。",
    "コーヒーと紅茶とどちらが好きですか。",
    "サッカーをしませんか。",
    "このシャツは安いです。",
    "スポーツが上手です。",
    "寒い時にセーターを着ます。",
    "ソファーで休んでいます。",
    "タクシーで行きましょう。",
    "チョコレートは甘くておいしいです。",
    "ツアーに参加したいです。",
    "テレビを見ながらご飯を食べます。",
    "トマトが嫌いです。",
    "ナイフでパンを切ります。",
    "毎朝ニュースを見ます。",
    "カップヌードルを食べたことがあります。",
    "青いネクタイをしている人は父です。",
    "ノートに名前を書いてください。",
    "昼ごはんはハンバーガーでした。",
    "寒いので、ヒーターをつけました。",
    "フランスへ旅行に行きます。",
    "ヘリコプターに乗ったことがありません。",
    "駅の近くにホテルがあります。",
    "マンゴーが一番好きです。",
    "朝はミルクしか飲みません。",
    "ここはムードがいいですね。",
    "先生にメールを送りました。",
    "大きいモニターがほしいです。",
    "ヤングな考え方が好きです。",
    "彼にはユーモアがあります。",
    "毎週ヨガをしています。",
    "ラーメンが食べたくなりました。",
    "彼はチームのリーダーです。",
    "ルールを守らなければなりません。",
    "あのレストランで食事しましょう。",
    "ロボットを作ることができます。",
    "フランスのワインはおいしいです。",
    "パンを買いに行きます。",
    "朝パンとコーヒーを飲みます。",
]

VOICE = "ja-JP-NanamiNeural"  # 女声，自然
OUTPUT_DIR = "audio"

async def generate_one(idx, text):
    """生成单个 mp3 文件"""
    filename = os.path.join(OUTPUT_DIR, f"{idx:03d}.mp3")
    # 跳过已生成的
    if os.path.exists(filename) and os.path.getsize(filename) > 1000:
        return f"[SKIP] {idx:03d}.mp3 (already exists)"
    try:
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")  # 稍慢 5%
        await communicate.save(filename)
        size = os.path.getsize(filename)
        return f"[OK]   {idx:03d}.mp3  ({size:,} B)  {text[:24]}"
    except Exception as e:
        return f"[FAIL] {idx:03d}.mp3  ERR: {e}"

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Total sentences: {len(SENTENCES)}")
    print(f"Voice: {VOICE}")
    print(f"Output: {OUTPUT_DIR}/")
    print("-" * 60)
    # 并发限制 4，避免被限流
    sem = asyncio.Semaphore(4)
    async def run(idx, text):
        async with sem:
            result = await generate_one(idx, text)
            print(result, flush=True)
            await asyncio.sleep(0.1)
    tasks = [run(i + 1, t) for i, t in enumerate(SENTENCES)]
    await asyncio.gather(*tasks)
    print("-" * 60)
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
