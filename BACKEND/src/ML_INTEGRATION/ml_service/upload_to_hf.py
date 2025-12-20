from huggingface_hub import HfApi

api = HfApi()

api.upload_folder(
    folder_path="models",
    repo_id="varungupta0994/skillbridge-ml-models",
    repo_type="model"
)
